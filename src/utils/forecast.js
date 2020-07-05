const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?&lat='+ latitude +'&lon='+ longitude +'&key=e5b3a7b050cf44efab7a2366893a25e2'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to server', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Thoi tiet: ' + body.data[0].weather.description + ' Nhiet Do: ' + body.data[0].temp + ' Do am: ' + body.data[0].rh)
        }
    })
}


module.exports = forecast