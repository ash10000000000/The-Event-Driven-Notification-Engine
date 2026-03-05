import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
    jobId: { type: String, required: true, unique: true },
    type: String,
    recipient: String,
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    error: String,
    createdAt: { type: Date, default: Date.now }
});
export const Notification = mongoose.model('Notification', notificationSchema);
//# sourceMappingURL=Notification.js.map