import { Enexpress } from './rest.mjs'
const PORT = 3000

const app = new Enexpress()

app.listen(PORT, () => {
  process.stdout.write('Server running at http://localhost:' + PORT + '\n')
})

app.get('/app', (_req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.get('/', (_req, res) => {
  res.json({ message: 'Hello, World!' })
})

app.post('/app', (req, res) => {
  const { message } = req.body
  res.json({ message: `Hello, ${message}!` })
})

app.put('/app', (req, res) => {
  const { message } = req.body
  res.json({ message: `Hello, ${message}!` })
})
