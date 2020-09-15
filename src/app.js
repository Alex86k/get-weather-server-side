import express from 'express'
import cors from 'cors'
import routes from "./routes"

const PORT =  5000

const app = express()

app.use(express.json({ extend: true }))
app.use(cors())
app.use('/weather', routes.weather)

app.listen(PORT, () => console.log(`App has ben started on port ${PORT}`))
