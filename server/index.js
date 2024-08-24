import express from 'express';
import dotenv from 'dotenv'
import connectDB from './connection.js';
import cors from 'cors'
import routes from './routes/EmployeeRouter.js';
import bodyParser from 'body-parser';

const app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/employee', routes )

app.listen(8080, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})