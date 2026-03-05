import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { notificationQueue } from '../queues/notificationQueue.js'; 
import { Notification } from '../models/Notification.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notif_db', {
  serverSelectionTimeoutMS: 5000 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.post('/send', async (req, res) => {
  try {
    // 1. Extract priority from request body (default to 10 if not provided)
    const { type, recipient, body, priority } = req.body;
    const jobId = uuidv4();

    await Notification.create({ jobId, type, recipient, status: 'PENDING' });
    
    // 2. Pass the priority into the Job options
    // In BullMQ, lower numbers = higher priority (e.g., 1 runs before 10)
    await notificationQueue.add('notification-job', 
      { type, recipient, body }, 
      { 
        jobId,
        priority: priority ? Number(priority) : 10 
      } 
    );

    res.status(202).json({ 
      success: true, 
      jobId, 
      priority: priority || 10,
      note: "Lower priority number means higher urgency" 
    });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/status/:jobId', async (req, res) => {
  const notif = await Notification.findOne({ jobId: req.params.jobId });
  if (!notif) return res.status(404).json({ error: 'Not found' });
  res.json(notif);
});

app.get('/stats', async (req, res) => {
  try {
    const total = await Notification.countDocuments();
    const successful = await Notification.countDocuments({ status: 'SUCCESS' });
    const failed = await Notification.countDocuments({ status: 'FAILED' });
    const pending = await Notification.countDocuments({ status: 'PENDING' });

    res.json({
      total_notifications: total,
      breakdown: {
        success: successful,
        failed: failed,
        pending: pending
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});






app.listen(3000, () => console.log('API running on port 3000'));