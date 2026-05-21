import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Finance App</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Olá, {user?.name}</span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-gray-500">Dashboard em construção... 🚧</p>
      </main>
    </div>
  )
}