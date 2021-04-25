const REQUEST_URL = "http://127.0.0.1:8000/model/";

$(document).ready(function() {
    console.log("heelo");
    const url = window.location.href;
    console.log(url);
    
    const query = REQUEST_URL + "?url=" + url;
    $.get(query, function(data, status) {
        if(data.response=="1")
        {
            
            console.log("LEG");
            alert("LEG");
        }
        else{
            console.log("PHISH");
            alert("PHISH");
        }
    });
});