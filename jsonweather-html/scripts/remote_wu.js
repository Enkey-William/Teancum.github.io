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
                    $('#cityDisplay').html(loc);
                    document.title = loc + " Weather Home";
                var currTemp = data.current_observation.temp_f;
                    $('#currentTemp').html(Math.round(currTemp) + "&degF");
                var summary = "It is currently " + data.current_observation.weather + ", with wind " + data.current_observation.wind_string + ".";
                    $('#summary').html(summary);
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

/*You are to get the city and state and combine them into a single location name separated by a comma and space. The name is to be displayed (using a jQuery selector) in the h1 element with an id of cityDisplay AND as the first item in the "title" element within the "head" element of the page (do not replace what's there, add this in front of what's already there).

You are to get the current temperature and display it into the li with an id of currentTemp. Make sure you use JavaScript to round the number to the closest integer and display the degree symbol following the number.

Finally, you are to display a summary of the current conditions in the li with an id of summary. Be sure the text starts with a capital letter (Hint: use the weather property from the current_observation object).

Three list items are provided in the index page, each with an id of "add1", "add2" and "add3" for your use.

Be sure that whatever you add makes sense from the site visitors perspective, don't make them guess what you meant - make it clear and obvious!

You may alter the CSS within the user_styles.css file to style this content if needed (this file is already set to be used, you don't need to do anything with the main stylesheet).

Prior to uploading this to your GitHub server, switch the local version to a CDN distributed current version of jQuery 3.x.*/
