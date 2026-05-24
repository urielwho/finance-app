import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#f43f5e', // Rose
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f97316'  // Orange
]

export default function CategoryChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense')
  const grouped = expenses.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 }
    acc[t.category].value += t.amount
    return acc
  }, {})

  const data = Object.values(grouped)
  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const totalExpense = data.reduce((acc, curr) => acc + curr.value, 0)
  const dark = document.documentElement.classList.contains('dark')

  if (data.length === 0) return null

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-100 dark:border-gray-800 p-3.5 rounded-xl shadow-xl text-xs flex flex-col gap-1 min-w-[130px] animate-in fade-in zoom-in-95 duration-100">
          <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">{payload[0].name}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500 dark:text-gray-400">Total</span>
            <span className="font-bold text-gray-800 dark:text-gray-100">{fmt(payload[0].value)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 mt-0.5">
            <span className="text-[10px] text-gray-400">Percentual</span>
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
              {((payload[0].value / totalExpense) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-800/80 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Gastos por Categoria</p>
      </div>

      <div className="relative h-[240px]">
        {/* Center Label for Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ transform: 'translateY(-20px)' }}>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">Total Gasto</span>
          <span className="text-xl font-extrabold text-gray-800 dark:text-gray-200 mt-0.5">{fmt(totalExpense)}</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              cx="50%" 
              cy="50%" 
              innerRadius={70} 
              outerRadius={88} 
              paddingAngle={3} 
              dataKey="value"
              animationDuration={500}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} className="stroke-white dark:stroke-gray-900 focus:outline-none" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
              formatter={(v) => <span className="text-gray-500 dark:text-gray-400 font-medium ml-1">{v}</span>}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}