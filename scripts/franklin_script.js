
    // Get the data from the wunderground API
    function getData()
    {
        $.ajax({
            url: "http://api.wunderground.com/api/7896087b2d3c9b8b/conditions/q/ID/Franklin.jsonp",
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
                /*var hourly =
                $("#hourlyTEMP").html(hourly);*/
            }
        });
        $("#cover").fadeOut(250);
    }

