const request = require('postman-request')


const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicXRyb25nMTAxMSIsImEiOiJjbG1jeTUxbHkwdndnM3BqcjBrYmp2cGUyIn0.42YBXrZ8bof3NWGoQW1fQQ&limit=1'
    request({url,json:true},(error, {body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location!',undefined)
        }
        else{
            const lattitude = body.features[0].center[1]
            const longtitude = body.features[0].center[0]
            callback(undefined,{
                lattitude,
                longtitude,
                location: body.features[0].place_name
            })
        }

    })
    
}
module.exports = geocode