router.get('/', function(req, res){
  // res.sendFile(process.cwd()+'/main.html', function(){
   

  // });
  // res.json(arrpos)
  console.log(Place);
});

app.get('/yelp', function(req, res){

	console.log(locArry[1][0].formattedAddress, "hey")

function yelpz(){
var Yelp = require('yelp');


Loc = locArry[1][0].formattedAddress;





var yelp = new Yelp({
  consumer_key: '5TBzLTyOV4OVhUrzGgaVBQ',
  consumer_secret: 'ag4xe5h3-ZGe3huiPQr1j5kX3LE',
  token: 'W2ILo6yUGiwfB4gsmEH8rvBqQjcwNGQh',
  token_secret: 'yNyEskFCaeehJwzCYJGrNCENtLU',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: Place, location: Loc, limit:20 })
.then(function (data) {
  // if (data.length=2) {
     // console.log(data.businesses[0].id);

  // };
  console.log(data.businesses.length)
 for (var i = 0; i < data.businesses.length; i++) {
 	if (data.businesses[i].rating > 3) {
 		console.log(data.businesses[i])
 		console.log([i])
 		var b = 0;
 		yelpArr.push(data.businesses[i])
 		console.log(yelpArr[0].id)
 	};

 		b++;
 	 // console.log(data.businesses[i])
 	 
 		// res.json('d')
 	 
 	   	// 	// res.json(data.businesses[i])
  	// 	console.log (yelpArr);
  	// 	console.log(yelpArr.length)
  		// res.json(yelpArr);
 	};

 // res.sendFile(process.cwd()+'/main.html')
 		if (b => 20) {
 			res.redirect('/')
 		};
 	
 // };


})
.catch(function (err) {
  console.error(err);
});
}
yelpz();

});










app.get('/api', function(req, res){

	function locater(){
	var geocoderProvider = 'google';
	var httpAdapter = 'https';
// optional 
	var extra = {
    apiKey: 'AIzaSyA32ZoqMzaSzODIPGhEVeZsU1rahWLTOyY', // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
 
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

	geocoder.reverse({lat: locArry[0].lat, lon: locArry[0].lng})
    .then(function(res1) {
    	console.log(res1)
    	var c = 0
    	// res.json(res1)
    	locArry.push(res1)
    	c++;
    	if (c > 0) {
    		res.redirect('/yelp')
    	};
    	 
    })
    .catch(function(err) {
        console.log(err);
    });
 
   }

locater();

  });

app.get('/api/loc', function(req, res){

	res.json(locArry, yelpArr);
});

app.post('/api/loc', function(req, res){
	var newPerson = req.body;
	console.log('ayyy lmao')
	console.log(newPerson);
	locArry.push(newPerson);
	});