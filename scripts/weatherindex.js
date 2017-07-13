// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long)
    {
        $.ajax({
            url: "https://api.wunderground.com/api/7896087b2d3c9b8b/geolookup/conditions/forecast/hourly/q/" + lat + "," + long + ".json",
            dataType: "jsonp",
            success: function(data)
            {
                console.log(data);
                var loc = data.current_observation.display_location.full;
                $('#citySate').html(loc);
                document.title = loc + " Weather Home";
                var currTemp = data.current_observation.temp_f;
                $('#currTemp').html(Math.round(currTemp) + "&degF");
                var hi_low = data.forecast.simpleforecast.forecastday[1].high.fahrenheit + "&degF" + " / " + data.forecast.simpleforecast.forecastday[1].low.fahrenheit + "&degF";
                $('#hi_low').html(hi_low);
                var summary = "It is currently " + data.current_observation.weather + ", with wind " + data.current_observation.wind_string + ".";
                $('#conditions').html(summary);
                var icon = data.current_observation.icon_url;
                $('#add1').html(icon);
                var humid = data.current_observation.relative_humidity;
                $('#add2').html("Humidity: " + humid);
                var vis = data.current_observation.visibility_mi;
                $('#add3').html("Visibility: " + vis);
            }
        });
        $("#cover").fadeOut(250);
    }

    // A function for changing a string to TitleCase
    function toTitleCase(str){
        return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
});
