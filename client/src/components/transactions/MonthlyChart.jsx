import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function MonthlyChart({ transactions }) {
  // Agrupa as transações por mês
  const grouped = transactions.reduce((acc, t) => {
    const month = format(new Date(t.date), 'MMM/yy', { locale: ptBR })

    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 }
    }

    if (t.type === 'income') acc[month].income += t.amount
    if (t.type === 'expense') acc[month].expense += t.amount

    return acc
  }, {})

  const data = Object.values(grouped)

  const fmt = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (data.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-6">Receitas vs Despesas</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `R$${v}`}
          />
          <Tooltip
            formatter={(value) => fmt(value)}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              boxShadow: 'none',
              fontSize: '13px'
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '16px' }}
            formatter={(value) => value === 'income' ? 'Receitas' : 'Despesas'}
          />
          <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expense" fill="#f87171" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}