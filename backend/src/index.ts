import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { sequelize } from './sequelize';
import { Task } from './models/task.model';


const app = express();
app.use(cors());
app.use(express.json());

// Synchronise la base : crée les tables automatiquement
sequelize.sync().then(() => {
  console.log('✅ Database synchronized');

  app.use('/api/tasks', taskRoutes);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('❌ Failed to sync database:', error);
});
