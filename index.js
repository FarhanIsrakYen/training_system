import cors from 'cors';
import express from 'express';
import rateLimit from "express-rate-limit";
import helmet from 'helmet';
import mongoose from 'mongoose';
import {
    DATABASE,
    MAX_JSON_SIZE, PORT,
    REQUEST_LIMIT_TIME,
    REQUEST_NUMBER,
    URL_ENCODE,
    WEB_CACHE
} from "./app/configs/config.js";
import router from "./routes/api/v1.js";
import {seedData} from "./app/database/seeder.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());
app.use(cookieParser());


const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME, max: REQUEST_NUMBER})
app.use(limiter)


app.set('etag', WEB_CACHE)

mongoose.connect(DATABASE, {autoIndex:true}).then(async () => {
    console.log("DB connected")
    await seedData().then(() =>
        console.log("Data seeded successfully")
    ).catch(() => {
        console.log("Data seed failed")
    });
}).catch(() => {
    console.log("DB disconnected")
})

app.use('/api/v1', router)

app.listen(PORT, () =>{
    console.log("Server started")
})