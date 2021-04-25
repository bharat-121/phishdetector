const REQUEST_URL = "http://127.0.0.1:8000/model/";
var url="";
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    url=tabs[0].url;
});

$(document).ready(function() {
  $("#check-phishing").click(function() {
    console.log(url);
    const query = REQUEST_URL + "?url=" + url;
    $.get(query, function(data, status) {
        if(data.response=="1")
        {
            console.log("LEG");
            $("#site_msg").text("Safe to Use");
        }
        else{
            
            console.log("PHISH");
            $("#site_msg").text("UnSafe to Use");

        }
    });
  });
});