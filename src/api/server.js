import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
// Corrected to lowercase 'n' to match your actual file: notificationQueue.ts
import { notificationQueue } from '../queues/notificationQueue.js';
import { Notification } from '../models/Notification.js';
const app = express();
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notif_db')
    .then(() => console.log(' Connected to MongoDB'))
    .catch(err => console.error(' MongoDB Connection Error:', err));
app.post('/send', async (req, res) => {
    try {
        const { type, recipient, body } = req.body;
        const jobId = uuidv4();
        // 1. Create record in MongoDB
        await Notification.create({ jobId, type, recipient, status: 'PENDING' });
        // 2. Add job to the BullMQ Redis Queue
        await notificationQueue.add('notification-job', { type, recipient, body }, { jobId });
        res.status(202).json({ success: true, jobId });
    }
    catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
app.get('/status/:jobId', async (req, res) => {
    const notif = await Notification.findOne({ jobId: req.params.jobId });
    if (!notif)
        return res.status(404).json({ error: 'Not found' });
    res.json(notif);
});
app.listen(3000, () => console.log('API running on port 3000'));
//# sourceMappingURL=server.js.map