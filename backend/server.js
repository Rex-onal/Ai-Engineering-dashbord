import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const cwd = process.cwd();
const DATA_DIR = cwd.endsWith('backend') || cwd.endsWith('backend\\')
  ? path.join(cwd, 'data')
  : path.join(cwd, 'backend', 'data');
const PHASES_FILE = path.join(DATA_DIR, 'phases.json');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure progress.json exists
if (!fs.existsSync(PROGRESS_FILE)) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({}));
}

// API endpoint to get phases data
app.get('/api/phases', (req, res) => {
  try {
    const data = fs.readFileSync(PHASES_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading phases file:', error);
    res.status(500).json({ error: 'Failed to load roadmap phases.' });
  }
});

// API endpoint to get resource progress
app.get('/api/progress', (req, res) => {
  try {
    const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading progress file:', error);
    res.status(500).json({ error: 'Failed to load progress state.' });
  }
});

// API endpoint to update progress
app.post('/api/progress', (req, res) => {
  const { resourceId, status } = req.body;
  
  if (!resourceId || !status) {
    return res.status(400).json({ error: 'resourceId and status are required.' });
  }

  const validStatuses = ['Not Started', 'In Progress', 'Done'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const progressData = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8') || '{}');
    progressData[resourceId] = status;
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progressData, null, 2));
    res.json({ success: true, progress: progressData });
  } catch (error) {
    console.error('Error writing progress file:', error);
    res.status(500).json({ error: 'Failed to save progress.' });
  }
});

// Serve frontend static build in production
const frontendBuildPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('AI Engineer Learning Dashboard API is running. Client is in dev mode.');
  });
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
