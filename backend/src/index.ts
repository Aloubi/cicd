import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { sequelize } from './sequelize';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/api/tasks', taskRoutes);

// Endpoint de test
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// ⚠️ Ne pas démarrer le serveur en test
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync()
    .then(() => {
      console.log('✅ Database synchronized');
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => {
        console.log(`✅ Backend running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('❌ Failed to sync database:', error);
    });
}

// ✅ On exporte `app` pour les tests
export default app;
