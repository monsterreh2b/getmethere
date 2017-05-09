
var CLIENT_ID = "4VUhVhVOSdP8";
var SECRET = "EghRc_w20qL6BntxutRQxDr1MMpB-Y3g";
var LYFT_TOKEN;



function authenticateLyft() {
  return axios({
    url: 'https://api.lyft.com/oauth/token',
    method: 'POST',
    data: {
      grant_type: 'client_credentials',
      scope: 'public'
    },
    headers: {
      "Authorization": "Basic " + btoa(CLIENT_ID + ":" + SECRET)
    }
  })
}

function getLyftPrices(start_lat, start_lng, end_lat, end_lng) {
  return axios({
    url: "https://api.lyft.com/v1/cost?start_lat="+start_lat+"&start_lng="+start_lng+"&end_lat="+end_lat+"&end_lng=" +end_lng,
    method: 'GET', 
    headers: {
      "Authorization": "Bearer " + LYFT_TOKEN
    }
  })
}

function convert(value) {
    return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
}

function dollar (value){


return( (value/100).toFixed( 2 ) );
}
authenticateLyft()
.then(function(response) {
  LYFT_TOKEN = response.data.access_token;
  //get html geolocation

  // pass it to lyft prices
  return getLyftPrices(37.7763, -122.3918, 37.7972, -122.4533);
   //return getLyftPrices(start_lat, start_lng, end_lat, end_lng);
    
})
.then(function(response) {
  console.log(response);
  var results = response.data;
   console.log(results);
   console.log(results.cost_estimates[2].estimated_duration_seconds);
   $("#lyft").append("<br>" + "Lyft average duration: " + convert(results.cost_estimates[2].estimated_duration_seconds) + " minutes");
   $("#lyft").append("<br>" + "Lyft average cost: $" + dollar(results.cost_estimates[2].estimated_cost_cents_min) + " dollars");
})
.catch(function(err) {

  console.error(err);
})




$("#getMeThere").on("click", function() {
       var inputAddress = $("#startAddress").val();
       console.log(inputAddress);


  var key= "AIzaSyAmoeeVA0-TiJTpH5tOGpwKGpPtryW51oY"
  var queryURL= "https://maps.googleapis.com/maps/api/geocode/json?address=" + inputAddress + key;

       $.ajax({
           url: queryURL,
           method: "GET"
        })
         .done(function(response) {
           console.log(response);
           

});
});




