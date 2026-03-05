import { Queue } from 'bullmq';
import { redisConnection } from './connection.js';
export const notificationQueue = new Queue('notification-stream', {
    connection: redisConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    }
});
//# sourceMappingURL=notificationQueue.js.map