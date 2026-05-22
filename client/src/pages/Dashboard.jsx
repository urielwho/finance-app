import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import SummaryCards from '../components/transactions/SummaryCards'
import TransactionList from '../components/transactions/TransactionList'
import TransactionModal from '../components/transactions/TransactionModal'
import MonthlyChart from '../components/transactions/MonthlyChart'
import CategoryChart from '../components/transactions/CategoryChart'

export default function Dashboard({ dark, setDark }) {
  const { user, logout } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    try {
      const { data } = await api.get('/transactions')
      setTransactions(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(formData) {
    if (editingTransaction) {
      await api.put(`/transactions/${editingTransaction.id}`, formData)
    } else {
      await api.post('/transactions', formData)
    }
    fetchTransactions()
    setEditingTransaction(null)
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja deletar esta transação?')) return
    await api.delete(`/transactions/${id}`)
    fetchTransactions()
  }

  function handleEdit(transaction) {
    setEditingTransaction(transaction)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
    setEditingTransaction(null)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">F</span>
            </div>
            <h1 className="text-base font-semibold text-gray-800 dark:text-gray-100">Finance App</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Alternar tema"
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Olá, <span className="font-medium text-gray-700 dark:text-gray-200">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="text-sm text-red-400 hover:text-red-500 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Visão geral</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">Acompanhe suas finanças</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            + Nova transação
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <SummaryCards transactions={transactions} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <MonthlyChart transactions={transactions} />
              <CategoryChart transactions={transactions} />
            </div>

            <TransactionList
              transactions={transactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      {showModal && (
        <TransactionModal
          onClose={handleCloseModal}
          onSave={handleSave}
          transaction={editingTransaction}
        />
      )}
    </div>
  )
}