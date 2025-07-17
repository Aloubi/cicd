import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { sequelize } from './sequelize';

const app = express();

// Autoriser le frontend React
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Pour lire les requêtes JSON
app.use(express.json());

// Routes principales
app.use('/api/tasks', taskRoutes);

// Sync Sequelize + démarrer serveur
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
