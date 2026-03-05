import axios from 'axios';

const API_URL = 'http://localhost:3000/send';
const TOTAL_JOBS = 50;

async function sendJob(index: number) {
  // Random priority between 1 (High) and 100 (Low)
  const priority = Math.floor(Math.random() * 100) + 1;
  
  const payload = {
    type: 'EMAIL',
    recipient: `user${index}@example.com`,
    body: `Load test notification number ${index}`,
    priority: priority
  };

  try {
    const response = await axios.post(API_URL, payload);
    console.log(`[Sent] Job ${index} | Priority: ${priority} | JobID: ${response.data.jobId}`);
  } catch (error: any) {
    console.error(`[Error] Job ${index} failed: ${error.message}`);
  }
}

async function runTest() {
  console.log(`Starting load test: Sending ${TOTAL_JOBS} jobs...`);
  const startTime = Date.now();

  const promises = [];
  for (let i = 1; i <= TOTAL_JOBS; i++) {
    promises.push(sendJob(i));
  }

  await Promise.all(promises);
  
  const duration = (Date.now() - startTime) / 1000;
  console.log(`Finished sending 50 requests in ${duration} seconds.`);
  console.log('Switch to your Worker terminal to see them being processed.');
}

runTest();