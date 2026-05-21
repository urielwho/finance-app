import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const fmt = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <p className="text-gray-400 text-sm">Nenhuma transação encontrada</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {transactions.map((t, index) => (
        <div
          key={t.id}
          className={`flex items-center justify-between px-6 py-4 ${
            index !== transactions.length - 1 ? 'border-b border-gray-50' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${
              t.type === 'income' ? 'bg-green-400' : 'bg-red-400'
            }`} />
            <div>
              <p className="text-sm font-medium text-gray-800">{t.title}</p>
              <p className="text-xs text-gray-400">
                {t.category} · {format(new Date(t.date), "dd 'de' MMM", { locale: ptBR })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium ${
              t.type === 'income' ? 'text-green-500' : 'text-red-500'
            }`}>
              {t.type === 'income' ? '+' : '-'} {fmt(t.amount)}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(t)}
                className="text-xs text-gray-400 hover:text-blue-500 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(t.id)}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
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