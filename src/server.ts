import app from './app'
import connectDB from './db/connect'
import 'dotenv/config'

const port = process.env.PORT || 3000

const start = async () => {
  try {
    const mongoURI = process.env.MONGO_URI

    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined')
    }
    await connectDB(mongoURI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
