//------GEOCODING REQUEST-----
const request = require('postman-request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicXRyb25nMTAxMSIsImEiOiJja3l5bmFlbHcwYXM3Mm5ybWgxNnd3dHc0In0.qlrJKgTt9yNyuU0k4mCCcw&limit=1'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services')
        }
        else if(body.features.length === 0){
            callback('Unable to find a location. Please enter valid location')
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}
module.exports = geocode