const multer = require('multer')
const heartRateService = require('../services/heartRateService')

const Multer = multer()

exports.processHeartRateData = [
    Multer.single('activityData'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Invalid payload!' })
            }

            // Read and parse the file directly from the buffer
            const fileContent = req.file.buffer.toString()
            const data = JSON.parse(fileContent)

            const heartRates = data['clinical_data']['HEART_RATE']['data']
            // Update the data with processed heart rates
            data.clinical_data.HEART_RATE.data = heartRateService.processHeartRate(heartRates)

            // Save the data to the database
            const savedData = await heartRateService.saveHeartRateData(data)

            res.json({
                message: 'Data processed and saved successfully',
                data: savedData,
            })
        } catch (error) {
            console.trace(error)
            res.status(500).json({ message: error.message })
        }
    }
]
