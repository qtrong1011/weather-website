//------WEATHER API REQUEST---------
const request = require('postman-request')

const forecast = (latitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=cd1db21d986138967443fe8fc04ada9c&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to Weather API.')
        }
        else if(body.error){
            callback('Unable to find the location.')
        }
        else{
            callback(undefined,{
                current_temp : body.current.temperature,
                feelslike_temp : body.current.feelslike,
                weather_description: body.current.weather_descriptions[0],
                weather_code: body.current.weather_code,
            })
        }
    })


}

module.exports = forecast

