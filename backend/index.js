require('dotenv').config();
const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/TaskRoutes').default;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Express Server test');
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
