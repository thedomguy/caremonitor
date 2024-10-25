const Pg = require('../db')

const { validate: isUuid } = require('uuid')

exports.processHeartRate = function (data) {
    const intervals = []
    const intervalMap = {}

    data.forEach(entry => {
        const timestamp = new Date(entry.on_date)
        const minutes = Math.floor(timestamp.getMinutes() / 15) * 15
        const intervalKey = `${timestamp.getHours()}:${minutes}`
        const fromDate = new Date(timestamp)
        fromDate.setMinutes(minutes)
        const toDate = new Date(fromDate)
        toDate.setMinutes(fromDate.getMinutes() + 15)

        if (!intervalMap[intervalKey]) {
            const interval = {
                from_date: fromDate.toISOString(),
                to_date: toDate.toISOString(),
                measurement: {
                    low: Number(entry.measurement),
                    high: Number(entry.measurement)
                }
            }
            intervalMap[intervalKey] = interval
            intervals.push(interval)
        } else {
            intervalMap[intervalKey].measurement.low = Math.min(intervalMap[intervalKey].measurement.low, Number(entry.measurement))
            intervalMap[intervalKey].measurement.high = Math.max(intervalMap[intervalKey].measurement.high, Number(entry.measurement))
        }
    })

    return intervals
}

exports.saveHeartRateData = async (data) => {
    const query = `
        INSERT INTO health_data (patient_id, org_id, timestamp, data)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `
    const values = [data["patient_id"], data["orgId"], data.timestamp, data["clinical_data"]]
    const result = await Pg.query(query, values)
    return result.rows[0]
}
