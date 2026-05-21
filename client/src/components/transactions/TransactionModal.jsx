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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {transaction ? 'Editar transação' : 'Nova transação'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Descrição</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Aluguel"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Valor</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Tipo</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  type === 'income'
                    ? 'bg-green-500 text-white'
                    : 'border border-gray-200 text-gray-600'
                }`}
              >
                Receita
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  type === 'expense'
                    ? 'bg-red-500 text-white'
                    : 'border border-gray-200 text-gray-600'
                }`}
              >
                Despesa
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Categoria</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Data</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors mt-2"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  )
}