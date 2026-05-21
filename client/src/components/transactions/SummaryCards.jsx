export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  const fmt = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Saldo atual</p>
        <p className={`text-2xl font-semibold ${balance >= 0 ? 'text-gray-800' : 'text-red-500'}`}>
          {fmt(balance)}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Receitas</p>
        <p className="text-2xl font-semibold text-green-500">{fmt(income)}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Despesas</p>
        <p className="text-2xl font-semibold text-red-500">{fmt(expense)}</p>
      </div>
    </div>
  )
}