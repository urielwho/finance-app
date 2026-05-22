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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Saldo atual</p>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-gray-800 dark:text-gray-100' : 'text-red-500'}`}>
          {fmt(balance)}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Total consolidado</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Receitas</p>
        <p className="text-2xl font-bold text-emerald-500">{fmt(income)}</p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
          {transactions.filter(t => t.type === 'income').length} transações
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Despesas</p>
        <p className="text-2xl font-bold text-red-500">{fmt(expense)}</p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
          {transactions.filter(t => t.type === 'expense').length} transações
        </p>
      </div>
    </div>
  )
}