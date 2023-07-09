import express from 'express';

const server = express();
const PORT = process.env.PORT;

server.get('/', (req, res) => {
  res.status(200).json({
    'message': 'Welcome to the app!'
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
