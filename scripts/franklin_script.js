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
                $('#cityState').html(loc);
                document.title = loc + " Weather Home";
                var currTemp = data.current_observation.temp_f;
                $('#currTEMP').html(Math.round(currTemp) + "&degF");
                var summary = "It is currently " + data.current_observation.weather + ", with wind " + data.current_observation.wind_string + ".";
                $('#summary').html(summary);
                var icon = data.forecast.simpleforecast.forecastday["1"].icon_url;
                $('#weatherimage').html(icon);
                var evening = data.forecast.txt_forecast.forecastday["1"].fcttext;
                $('#tonight').html("Tonight: " + evening);
                var hi_low = data.forecast.simpleforecast.forecastday["1"].high.fahrenheit + " / " + data.forecast.simpleforecast.forecastday["1"].low.fahrenheit;
                $('#hi_low').html(hi_low);
                var hourly = data.hourly_forecast.__proto__.forEach.hourly_forecast;
                $("#hourlyTEMP").html(hourly);
            }
        });
        $("#cover").fadeOut(250);
    }

    // A function for changing a string to TitleCase
    function toTitleCase(str){
        return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
});
