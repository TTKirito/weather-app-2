const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { query } = require('express')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'thuan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'thuan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'Please provide address!!!'})
    }

    geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
        if(error) {
           return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'thuan',
        errorMessage: 'Help you create site'
    })
})
app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'thuan',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('server is running at '+ port)
})
