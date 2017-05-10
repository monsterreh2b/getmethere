$(document).ready(function(){
  console.log("hi");
$("#target").submit(function(event) {
  event.preventDefault();
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
});
