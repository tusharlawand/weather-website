const request = require('request')

const forecast = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=07a90700a20d11882acb510b8f382ad6&query=' + latitude +','+ longitude +'&unit=s'
    request({url, json:true}, (error, {body})=>{
        if(error)
    {
       callback('unable to connect services',undefined)
    }
    else if(body.error){
        callback('unable to find location ', undefined)
    }else{
        callback(undefined,'todays weather ' + body.current.weather_descriptions[0] +  ' temp : ' + body.current.temperature)
    }
    })
}

module.exports = forecast