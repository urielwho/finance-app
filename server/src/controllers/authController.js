const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma')

exports.register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token })
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email ou senha inválidos' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    return res.json({ user: { id: user.id, name: user.name, email: user.email }, token })
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}