import express from "express"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import pricindRoute from "./routes/pricing.js"
import bookingRoute from "./routes/bookings.js"
import adminRoutes from "./routes/admin.js"

import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

dotenv.config({path: '../.env'})

app.use(cors({
    origin: "*",// direct frontend ka url bhi de skte h like "http://localhost:5173"
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use('/api', userRoute)
app.use('/api', adminRoutes)
app.use('/api', bookingRoute)
app.use('/api', pricindRoute)

app.listen(port, ()=>{
    console.log(`App is listening at ${port}`);
})