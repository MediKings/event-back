import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoute.js';
import uploadRoute from "./routes/uploadRoute.js"
import sendEMailRoute from "./routes/sendEmailRoute.js"
import cors from 'cors';

const app = express();
const port = 5000

// Middleware
app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

// Routes
app.use('/api', authRoute)
app.use('/api', eventRoute)
app.use('/api/upload', uploadRoute)
app.use('/api', sendEMailRoute)

app.listen(port, () => {
    console.log('App is running...')
})
