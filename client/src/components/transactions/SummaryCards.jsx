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

  const incomeCount = transactions.filter(t => t.type === 'income').length
  const expenseCount = transactions.filter(t => t.type === 'expense').length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      {/* Saldo Atual Card */}
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Saldo Atual</p>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
        <p className={`text-3xl font-extrabold tracking-tight ${balance >= 0 ? 'text-gray-900 dark:text-gray-100' : 'text-rose-500 dark:text-rose-400'}`}>
          {fmt(balance)}
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            balance >= 0 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
          }`}>
            {balance >= 0 ? 'Positivo' : 'Negativo'}
          </span>
          <p className="text-xs text-gray-400 dark:text-gray-600">Total consolidado</p>
        </div>
      </div>

      {/* Receitas Card */}
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Receitas</p>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-colors group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
          {fmt(income)}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
          <span className="font-semibold text-gray-600 dark:text-gray-400">{incomeCount}</span> {incomeCount === 1 ? 'transação' : 'transações'}
        </p>
      </div>

      {/* Despesas Card */}
      <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Despesas</p>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-colors group-hover:bg-rose-100 dark:group-hover:bg-rose-900/40">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-rose-600 dark:text-rose-400">
          {fmt(expense)}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">
          <span className="font-semibold text-gray-600 dark:text-gray-400">{expenseCount}</span> {expenseCount === 1 ? 'transação' : 'transações'}
        </p>
      </div>
    </div>
  )
}