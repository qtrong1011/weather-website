const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Jason Luu'
    })
})
//app.com/help
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        message: 'I am here to help you. Ask question!',
        name: 'Jason Luu'
    })

})
//app.com/about
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Jason Luu'
    })

})
//app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error,{weather_description})=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: weather_description,
                location,
                address: req.query.address
            })
            

        })

    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})
// 404 page for Help route
app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Jason Luu',
        errorMessage: 'Help article not found.' 
    })

})


//404 page for any route (MUST BE LAST)
app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Jason Luu',
        errorMessage: 'Page not found.' 
    })

})

//Start up server
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})