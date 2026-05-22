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
  const muted = dark ? '#4b5563' : '#e5e7eb'
  const textColor = dark ? '#9ca3af' : '#9ca3af'
  const bgColor = dark ? '#111827' : '#ffffff'

  if (data.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-6">Receitas vs Despesas</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={muted} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} tickFormatter={v => `R$${v}`} />
          <Tooltip
            formatter={(value) => fmt(value)}
            contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: bgColor, fontSize: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} formatter={(v) => v === 'income' ? 'Receitas' : 'Despesas'} />
          <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expense" fill="#f43f5e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}