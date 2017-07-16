//Get data from JSON
$(function()
  {
    $.getJSON("js/acme.json", function(data)
        {
            //make sure it's there
            console.log(data);

        //Build output
            var tab = "<li><a href='/acme/index.html'>Home</a></li>";
            var i = 0;
                $.each(data.Navigation, function (key)
                {
                    tab += "<li><a href=#>" + data.Navigation[i] + "</a><li>";
                    i++;
                });
            $("#mainnav ul").html(tab);
        $("#contentTitle").html("Welcome to ACME!")
        });
  });

//Listen for click events
$("#mainnav").on("click", "a", function(event){
    var view = $(this).text();
    console.log(view);
    if (view != "Home"){
    $.ajax({
        url: "js/acme.json",
        dataType: "json",
        //Change output based on which link is clicked
        success: function (data) {
            console.log(data[view]);
            document.title = "ACME: " + view;
            $("#title").html(view);
            $("#description").html("DESCRIPTION: " + data[view].description);
                console.log(data[view].description);
            $("#manufacturer").html("Manufactured by: " + data[view].manufacturer);
                console.log("Manufactured by: " + data[view].manufacturer);
            $("#price").html("Cost: " + data[view].price);
                console.log("Cost: " + data[view].price);
            $("#blank").html("Overall review: " + data[view].reviews + "/5");
            console.log("Overall review: " + data[view].reviews + "/5");

            $("#picture").empty("img");
            $("#picture").append("<img src='" + data[view].path + "' id = 'picture' alt='product image'>");

            //hide the main page shtuffs
            $("#centerdiv").css("display", "none");
            $("#bottomdiv").css("display", "none");
        }
    });
    }
    else $("#mainnav ul").html("<li><a href='/acme/index.html'>Home</a></li>");
});
