const connectMongo = require('./db');
const express = require('express')

connectMongo();
const app = express()
const port = 5000

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Multiple pages routers

// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello sign up!')
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})