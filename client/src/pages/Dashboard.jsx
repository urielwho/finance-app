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

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

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

  // Compute Filtered Transactions for Charts and Lists
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || t.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  // Get User Initial
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <div className="min-h-screen w-full bg-gray-50/50 dark:bg-gray-950/40 text-gray-800 dark:text-gray-150 transition-colors duration-300 relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-900/75 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 px-4 sm:px-6 py-3.5 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-base font-bold bg-gradient-to-r from-gray-800 to-gray-950 dark:from-gray-100 dark:to-gray-200 bg-clip-text text-transparent tracking-tight">
              Finance App
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme switcher */}
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200/80 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-gray-700 dark:hover:text-gray-200 transition-all cursor-pointer shadow-sm"
              title="Alternar tema"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Profile pill */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200/80 dark:border-gray-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm select-none">
                {userInitial}
              </div>
              <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">
                Olá, <span className="font-semibold text-gray-700 dark:text-gray-200">{user?.name}</span>
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 hover:underline transition-all cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100">Visão Geral</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium uppercase tracking-wider">Painel Financeiro Corporativo</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nova Transação
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest animate-pulse">Carregando dados...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Total Balance Cards - reflect all transactions */}
            <SummaryCards transactions={transactions} />

            {/* Visual Analytics - reflect filtered transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonthlyChart transactions={filteredTransactions} />
              <CategoryChart transactions={filteredTransactions} />
            </div>

            {/* Interactive Transaction list - reflects filters & queries */}
            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </div>
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