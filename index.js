const express = require('express');
const request = require('request');
const app = express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null })

});
app.listen(3000, () => {
    console.log("server ")
})


app.post('/', (req, res) => {
    let moviename = req.body.city_name
    let moviename2 = req.body.city_name1
    let url = `https://api.covid19api.com/dayone/country/${moviename}/status/${moviename2}`
    request(url, (error, response, body)=> {
        console.log(response)
        if (error) {
            res.render('index', { weather: null, error: 'Error Please try again' })
        }
        else {
            weather = JSON.parse(body);
            res.render('index', { weather: weather, error: null })
        }
    });

})
