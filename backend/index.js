import express  from "express";
import path from 'path'
import mongodb from './config/db.js';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
import productRoutes from './Routes/productRoutes.js'
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
mongodb()

const app = express();
const currentPath = path.resolve()
const __dirname = path.dirname(currentPath);
app.use(express.json());
app.use('/api/users',userRoute);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))

  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 