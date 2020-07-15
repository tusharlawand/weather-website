
const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setupm static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Tushar'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Tushar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Tushar'
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'location not provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error){
            return res.send({ error })
        }
       
        
         forecast(latitude,longitude,(error, forecastData)=>{
    
             if(error){
               return res.send({ error })
             }else{
            
             res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        }
         })
     })
  
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must have to provide search item.'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg: 'Help topic not found',
        name: 'Tushar'
    })
})
app.get('*',(req, res)=>{
 res.render('404',{
    title: '404',
    name: 'Tushar',
    msg: 'Page not found'
 })
})

app.listen(3000, ()=>{
    console.log('server is running on port 3000...')
})