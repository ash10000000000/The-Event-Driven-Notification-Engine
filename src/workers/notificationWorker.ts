import { Worker, Job } from 'bullmq';
import mongoose from 'mongoose';
import { redisConnection } from '../queues/connection.js';
import { Notification } from '../models/Notification.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notif_db')
  .then(() => console.log(' Worker connected to MongoDB'))
  .catch(err => console.error('Worker MongoDB Connection Error:', err));

const worker = new Worker(
  'notification-stream',
  async (job: Job) => {
    const trackingId = job.opts.jobId || job.id;
    console.log(`[Worker] Processing Job ID: ${trackingId}`);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (Math.random() > 0.8) {
        throw new Error("External Provider Service Down (Simulated)");
      }

      await Notification.findOneAndUpdate(
          { jobId: trackingId } as any,
          { status: 'SUCCESS' }
      );

      console.log(`[Worker] Successfully sent to ${job.data.recipient}`);
    } catch (err: any) {
      await Notification.findOneAndUpdate(
          { jobId: trackingId } as any,
          { status: 'FAILED', error: err.message }
      );

      console.error(`[Worker] ❌ Failed to process job: ${err.message}`);
      throw err;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5
  }
);

worker.on('active', (job) => {
  console.log(`[Worker] Job ${job.id} is now active`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker]  Job ${job?.id} has permanently failed: ${err.message}`);
});

console.log(' Notification Worker is active and waiting for jobs...');