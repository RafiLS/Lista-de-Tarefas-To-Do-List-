require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tarefas = [];
let idCounter = 1;

// ===== CRUD Routes ===== //


// =====  ===== //



// test route
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando!');
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
}
