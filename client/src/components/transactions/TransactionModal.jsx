import { useState, useEffect } from 'react'

const CATEGORIES = [
  'Alimentação', 'Moradia', 'Transporte', 'Saúde',
  'Educação', 'Lazer', 'Trabalho', 'Investimento', 'Outros'
]

export default function TransactionModal({ onClose, onSave, transaction }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Outros')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  // Se veio uma transação, preenche o formulário pra edição
  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title)
      setAmount(transaction.amount)
      setType(transaction.type)
      setCategory(transaction.category)
      setDate(transaction.date.split('T')[0])
    }
  }, [transaction])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave({ title, amount: Number(amount), type, category, date })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {transaction ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Tipo Selector */}
          <div>
            <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 block uppercase tracking-wider">Tipo</label>
            <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-gray-950/40 p-1.5 rounded-xl border border-gray-100 dark:border-gray-800/50">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  type === 'income'
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                Receita
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  type === 'expense'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                Despesa
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 block uppercase tracking-wider">Descrição</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
              placeholder="Ex: Supermercado"
              required
            />
          </div>

          {/* Valor */}
          <div>
            <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 block uppercase tracking-wider">Valor (R$)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500 text-sm font-medium pointer-events-none">
                R$
              </span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
                placeholder="0,00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 block uppercase tracking-wider">Categoria</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 dark:text-gray-100 transition-all cursor-pointer"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c} className="bg-white dark:bg-gray-900">{c}</option>
              ))}
            </select>
          </div>

          {/* Data */}
          <div>
            <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 block uppercase tracking-wider">Data</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 dark:text-gray-100 transition-all"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}