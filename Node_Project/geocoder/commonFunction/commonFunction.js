var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'opencage',
    httpAdapter: 'https',
    apiKey: 'fd7f74fb24134a10a6b137a6efec4a77',
    formatter: null
};
 


var geocoder = NodeGeocoder(options);
module.exports={
  


    geoCode: (req, callback) => {


        geocoder.geocode(req, (err, result) => {
            console.log("req",req);
            if (err) {
                console.log("sdsdsd")
                callback(err, null);

            }
            else {
                console.log("in fun 73>>>>>>>>", result)


                let lat = result[0].latitude;
                let long = result[0].longitude;
                console.log("74----", lat, long)
                var coordinate = { lat, long }
                console.log("in 80 fun >>>>>>>>>>>", coordinate)
                callback(null, coordinate);
            }
        });


    },
    // geoCodeReverse: ({lat,long}, callback) => {


    //     geocoder.reverse({lat,long}, (err, result) => {
    //         console.log("req",req);
    //         if (err) {
    //             console.log("sdsdsd")
    //             callback(err, null);

    //         }
    //         else {
          
    //             callback(null, result);
    //         }
    //     });


    // }
    }