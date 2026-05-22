import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const fmt = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-12 text-center">
        <p className="text-gray-300 dark:text-gray-600 text-4xl mb-3">💸</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">Nenhuma transação ainda</p>
        <p className="text-gray-300 dark:text-gray-600 text-xs mt-1">Clique em "+ Nova transação" para começar</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          Transações recentes
        </p>
      </div>
      {transactions.map((t, index) => (
        <div
          key={t.id}
          className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
            index !== transactions.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${
              t.type === 'income'
                ? 'bg-emerald-50 dark:bg-emerald-900/30'
                : 'bg-red-50 dark:bg-red-900/30'
            }`}>
              {t.type === 'income' ? '↑' : '↓'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{t.title}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t.category} · {format(new Date(t.date), "dd 'de' MMM, yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-sm font-semibold ${
              t.type === 'income' ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {t.type === 'income' ? '+' : '-'} {fmt(t.amount)}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(t)}
                className="px-2.5 py-1 text-xs text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(t.id)}
                className="px-2.5 py-1 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}