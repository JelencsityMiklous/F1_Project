import express from 'express';
import { AppDataSource } from '../data-source';
import { PointsService } from '../services/point.service';

const router = express.Router();

const pointsService = new PointsService(AppDataSource);

router.get('/drivers', async (req, res) => {
  try {
    const data = await pointsService.getDriverPoints();
    res.json(data);
  } catch (err) {
    console.error('Driver points error:', err);
    res.status(500).json({ error: 'Szerver hiba' });
  }
});

router.get('/constructors', async (req, res) => {
  try {
    const data = await pointsService.getConstructorPoints();
    res.json(data);
  } catch (err) {
    console.error('Constructor points error:', err);
    res.status(500).json({ error: 'Szerver hiba' });
  }
});

export default router;