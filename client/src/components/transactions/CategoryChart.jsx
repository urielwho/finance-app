import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'

const COLORS = [
  '#6366f1', '#000a4b', '#f59e0b', '#ef4444',
  '#3b82f6', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6'
]

export default function CategoryChart({ transactions }) {
  // Considera só despesas pra categoria
  const expenses = transactions.filter(t => t.type === 'expense')

  const grouped = expenses.reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = { name: t.category, value: 0 }
    }
    acc[t.category].value += t.amount
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
      <h3 className="text-sm font-medium text-gray-700 mb-6">Gastos por categoria</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
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
            wrapperStyle={{ fontSize: '13px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}