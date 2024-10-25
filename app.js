const express = require('express')
const bodyParser = require('body-parser')
const heartRateRoutes = require('./routes/heartRateRoutes')
const app = express()
app.use(bodyParser.json())
app.use('/api/heart-rate', heartRateRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// endpoint to test server

app.get('/', (req, res) => {
    res.send('Server is running')
})
