//Get data from JSON
$(function()
  {
    $.getJSON("acme.json", function(data)
             {
                //Build output
                var tab = "<li><a href="/acme/index.html">Home</a></li>";
                var i = 0;
                $.each(data.Navigation, function (key)
                       {
                            tab = "<li>"
                        });
              });
  });

//Listen for click events

//Change output based on which link is clicked

//
