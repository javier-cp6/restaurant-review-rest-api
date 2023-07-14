import express from 'express';
import { connect } from './db/db.js';
import { restaurantRouter } from "./routes/restaurant.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(restaurantRouter);

connect()
  .then(() => {
    app.get('/', (req, res) => {
      res.status(200).json({
        message: 'Welcome to the Restaurant Review App!',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });