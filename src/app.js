const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to work
app.use(express.static(publicDirectoryPath))


//Home Route
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name: "Jason Luu"
    })
})

//About Route
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Jason Luu'
    })
})
//Help Route
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Jason Luu'
    })
})
//Weather Route
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'You must provide an address.'
        })
    }else{
        geocode(req.query.address,(error, {lattitude,longitude,location}={})=>{ 
            if(error){
                res.send({error})
            }
            else{
                forecast(lattitude,longitude,(error, forecastData)=>{
                    if(error){
                        res.send({error})
                    }
                    else{
                        res.send({
                            forecast: forecastData,
                            location,
                            address: req.query.address
                        })
                    }

                })
            }


        })
    }
})

app.get('/product',(req,res)=>{
    if(req.query.search){
        console.log(req.query.search)
        res.send({
            products:[]
        })
    }else{
        res.send({
            error: 'You must provide search term.'
        })
    }
    
})

//404 Routes
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Jason Luu',
        errorMessage : "Help Article Not Found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name: 'Jason Luu',
        errorMessage: 'Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})