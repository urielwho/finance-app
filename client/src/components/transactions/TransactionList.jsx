import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const CATEGORY_COLORS = {
  'Alimentação': 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400',
  'Moradia': 'bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400',
  'Transporte': 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
  'Saúde': 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400',
  'Educação': 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400',
  'Lazer': 'bg-pink-50 text-pink-600 dark:bg-pink-950/30 dark:text-pink-400',
  'Trabalho': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
  'Investimento': 'bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400',
  'Outros': 'bg-slate-50 text-slate-600 dark:bg-slate-900/40 dark:text-slate-400'
}

function getCategoryIcon(category) {
  switch (category) {
    case 'Alimentação':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      )
    case 'Moradia':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'Transporte':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    case 'Saúde':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    case 'Educação':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    case 'Lazer':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'Trabalho':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'Investimento':
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
  }
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter
}) {
  const fmt = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const uniqueCategories = Object.keys(CATEGORY_COLORS)

  const isFiltered = searchQuery !== '' || typeFilter !== 'all' || categoryFilter !== 'all'

  function handleResetFilters() {
    setSearchQuery('')
    setTypeFilter('all')
    setCategoryFilter('all')
  }

  return (
    <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-800/80 overflow-hidden shadow-sm">
      {/* Search and Filters Header */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-850 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-auto flex items-center justify-between gap-4">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Transações Recentes
          </p>
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="md:hidden text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar transação..."
              className="w-full bg-gray-50/50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-850 dark:text-gray-150 placeholder-gray-400 dark:placeholder-gray-600 transition-all"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full sm:w-auto bg-gray-50/50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all">Todos os tipos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto bg-gray-50/50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="all">Todas as categorias</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="hidden md:block text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-750 hover:underline cursor-pointer shrink-0 transition-colors"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Main List */}
      {transactions.length === 0 ? (
        <div className="p-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-950/60 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner border border-gray-100/50 dark:border-gray-800/30">
            {isFiltered ? '🔍' : '💸'}
          </div>
          <p className="text-gray-600 dark:text-gray-350 text-sm font-semibold">
            {isFiltered ? 'Nenhuma transação corresponde aos filtros' : 'Nenhuma transação registrada'}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1 max-w-xs">
            {isFiltered 
              ? 'Tente ajustar sua busca ou limpar os filtros para visualizar outras transações.' 
              : 'Clique em "+ Nova transação" acima para registrar sua primeira movimentação financeira.'}
          </p>
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="mt-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Limpar Filtros
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800/80">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between px-6 py-4.5 hover:bg-gray-50/50 dark:hover:bg-gray-850/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {/* Category Icon Badge */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  CATEGORY_COLORS[t.category] || 'bg-slate-50 text-slate-600 dark:bg-slate-900/40 dark:text-slate-400'
                }`}>
                  {getCategoryIcon(t.category)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-100 tracking-tight leading-snug">
                    {t.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500">
                      {t.category}
                    </span>
                    <span className="text-[10px] text-gray-300 dark:text-gray-700">•</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {format(new Date(t.date), "dd 'de' MMM, yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                {/* Amount */}
                <span className={`text-sm font-extrabold tracking-tight shrink-0 ${
                  t.type === 'income' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                }`}>
                  {t.type === 'income' ? '+' : '-'} {fmt(t.amount)}
                </span>
                
                {/* Action Buttons (visible on hover) */}
                <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onEdit(t)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                    title="Editar transação"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                    title="Deletar transação"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}