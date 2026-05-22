import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#220846', '#f59e0b', '#f43f5e', '#3b82f6', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6']

export default function CategoryChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense')
  const grouped = expenses.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 }
    acc[t.category].value += t.amount
    return acc
  }, {})

  const data = Object.values(grouped)
  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const dark = document.documentElement.classList.contains('dark')
  const bgColor = dark ? '#111827' : '#ffffff'

  if (data.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-6">Gastos por categoria</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: bgColor, fontSize: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}