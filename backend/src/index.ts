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

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.use('/api/tasks', taskRoutes);

// Démarrer le serveur seulement si ce fichier est exécuté directement
if (require.main === module) {
  sequelize.sync().then(() => {
    console.log('✅ Database synchronized');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`✅ Backend running on http://localhost:${PORT}`);
    });
  }).catch((error) => {
    console.error('❌ Failed to sync database:', error);
  });
}

export default app; // exporte l'app pour les tests

// Relance analyse SonarCloud après config
