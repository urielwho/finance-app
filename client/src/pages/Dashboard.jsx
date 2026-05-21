import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import SummaryCards from '../components/transactions/SummaryCards'
import TransactionList from '../components/transactions/TransactionList'
import TransactionModal from '../components/transactions/TransactionModal'

export default function Dashboard() {
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Finance App</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Olá, {user?.name}</span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Visão geral</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Nova transação
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Carregando...</p>
        ) : (
          <>
            <SummaryCards transactions={transactions} />
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