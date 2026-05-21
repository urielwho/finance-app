const prisma = require('../prisma')

// Lista todas as transações do usuário logado
exports.list = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { date: 'desc' }
    })
    return res.json(transactions)
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar transações' })
  }
}

// Cria uma nova transação
exports.create = async (req, res) => {
  const { title, amount, type, category, date } = req.body

  if (!title || !amount || !type || !category) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' })
  }

  if (type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Tipo deve ser income ou expense' })
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        type,
        category,
        date: date ? new Date(date) : new Date(),
        userId: req.userId
      }
    })
    return res.status(201).json(transaction)
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao criar transação' })
  }
}

// Atualiza uma transação existente
exports.update = async (req, res) => {
  const { id } = req.params
  const { title, amount, type, category, date } = req.body

  try {
    const transaction = await prisma.transaction.findUnique({ where: { id } })

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' })
    }

    if (transaction.userId !== req.userId) {
      return res.status(403).json({ error: 'Sem permissão para editar esta transação' })
    }

    const updated = await prisma.transaction.update({
      where: { id },
      data: { title, amount, type, category, date: date ? new Date(date) : undefined }
    })

    return res.json(updated)
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar transação' })
  }
}

// Deleta uma transação
exports.remove = async (req, res) => {
  const { id } = req.params

  try {
    const transaction = await prisma.transaction.findUnique({ where: { id } })

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' })
    }

    if (transaction.userId !== req.userId) {
      return res.status(403).json({ error: 'Sem permissão para deletar esta transação' })
    }

    await prisma.transaction.delete({ where: { id } })

    return res.status(204).send()
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao deletar transação' })
  }
}