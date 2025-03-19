import mongoose from 'mongoose';
import cron from 'node-cron';
import News, { newsSchema } from '../model/news.models.js';
import ScheduleNews, { newsSchema as ScheduleNewsSchema } from '../model/scheduleNews.model.js';
import dotenv from 'dotenv';
import EventNews, { eventNewsSchema } from '../model/event.news.model.js';
import YtNews, { ytNewsSchema } from '../model/yt-news.models.js';

dotenv.config();

const destConnection = mongoose.createConnection(process.env.MONGO_DB_BACKUP);

// Define schemas for destination only
const DestNews = destConnection.model('News', newsSchema);
const DestEventNews = destConnection.model('EventNews', eventNewsSchema);
const DestScheduleNews = destConnection.model('ScheduleNews', ScheduleNewsSchema);
const DestYtNews = destConnection.model('YtNews', ytNewsSchema);

const sourceSchemas = [
    { source: News, destination: DestNews },
    { source: EventNews, destination: DestEventNews },
    { source: ScheduleNews, destination: DestScheduleNews },
    { source: YtNews, destination: DestYtNews },
  ];

// Define the cron job (runs every day at 1 AM)
cron.schedule(' 0 1 * * *', async () => {
  console.log('Running news for backup cron job...');

  try {
    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date();
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    for (const { source, destination } of sourceSchemas) {
      // Fetch yesterday's news
      const yesterdaysNews = await source.find({ createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd } });
    //   console.log(`Found ${yesterdaysNews.length} records from ${source.modelName}.`);

      // Save to destination MongoDB
      if (yesterdaysNews.length) {
        await destination.insertMany(yesterdaysNews);
        // console.log(`Saved ${yesterdaysNews.length} records to ${destination.modelName} in destination DB.`);
      }

      // Delete news older than 10 days from destination DB
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      
      // Convert to a date string (YYYY-MM-DD) to ignore time completely
      const dateOnly = tenDaysAgo.toISOString().split('T')[0];
      
      // Define the start and end of the day in UTC
      const startOfDay = new Date(`${dateOnly}T00:00:00.000Z`);
      const endOfDay = new Date(`${dateOnly}T23:59:59.999Z`);
      
      const deleted = await destination.deleteMany({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
    }
  } catch (error) {
    console.error('Error running cron job:', error);
  }
});

