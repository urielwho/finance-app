require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})