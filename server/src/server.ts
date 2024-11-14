import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serves static files in the entire client's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catchall handler for React routes (only for non-API routes)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Test database connection and sync models
async function startServer() {
    try {
        // Sync models (create tables if they don't exist)
        await sequelize.sync({ force: false }); // Set to `false` to avoid dropping existing tables
        console.log('Database models synchronized successfully.');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the function to start the server
startServer();