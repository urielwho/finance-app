import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function MonthlyChart({ transactions }) {
  const grouped = transactions.reduce((acc, t) => {
    const month = format(new Date(t.date), 'MMM/yy', { locale: ptBR })
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 }
    if (t.type === 'income') acc[month].income += t.amount
    if (t.type === 'expense') acc[month].expense += t.amount
    return acc
  }, {})

  const data = Object.values(grouped)
  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const dark = document.documentElement.classList.contains('dark')
  
  const gridColor = dark ? '#1e293b' : '#f1f5f9'
  const textColor = '#94a3b8' // slate-400

  if (data.length === 0) return null

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-100 dark:border-gray-800 p-3.5 rounded-xl shadow-xl text-xs flex flex-col gap-1.5 min-w-[140px] animate-in fade-in zoom-in-95 duration-100">
          <p className="font-bold text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800/80 pb-1 mb-1">{label}</p>
          {payload.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.dataKey === 'income' ? '#10b981' : '#f43f5e' }} />
                {p.dataKey === 'income' ? 'Receitas' : 'Despesas'}
              </span>
              <span className="font-bold text-gray-800 dark:text-gray-100">{fmt(p.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Fluxo Mensal (Receitas vs Despesas)</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barGap={6}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.85}/>
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.15}/>
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.85}/>
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.15}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 11, fill: textColor }} 
            axisLine={false} 
            tickLine={false} 
            dy={8}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: textColor }} 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={v => `R$ ${v}`}
            dx={-8}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.05)', radius: 4 }} />
          <Legend 
            wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} 
            formatter={(v) => <span className="text-gray-500 dark:text-gray-400 font-medium ml-1.5">{v === 'income' ? 'Receitas' : 'Despesas'}</span>}
            iconType="circle"
            iconSize={8}
          />
          <Bar dataKey="income" fill="url(#incomeGrad)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="url(#expenseGrad)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}