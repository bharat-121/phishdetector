
const REQUEST_URL = "https://jsonplaceholder.typicode.com/posts";

$(document).ready(function() {
    console.log("heelo");
    const url = window.location.href;
    console.log(url);
    
    const query = REQUEST_URL + "?url=" + url;
    $.get(query, function(data, status) {
        if(data.response=="1")
        {
            console.log("LEG");
            $("<style type='text/css'>#boxMX{display:none;background: #ccffcc;padding: 10px;border: 5px solid #0d0909;float: left;font-size: 1.2em;position: fixed;top: 50%; left: 50%;z-index: 99999;box-shadow: 2px 2px 20px #999; -moz-box-shadow: 0px 0px 20px #999; -webkit-box-shadow: 0px 0px 20px #999; border-radius:6px 6px 6px 6px; -moz-border-radius: 6px; -webkit-border-radius: 6px; font:13px Amatic SC, Helvetica, sans-serif; padding:6px 6px 4px;width:300px; color: white;}</style>").appendTo("head");

            function alertMX(t) {
            $( "body" ).append( $( "<div id='boxMX'><p class='msgMX' align=\"center\" style=\"font-family:Amatic;color:black;font-size:20px\"><img src='https://i.pinimg.com/originals/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg' alt='hello' height=30px width=30px><br>Beware, PHISHING Website</p></div>" ) );
            //$('.msgMX').text(t); 
            var popMargTop = ($('#boxMX').height() + 24) / 2, popMargLeft = ($('#boxMX').width() + 24) / 2; 
            $('#boxMX').css({ 'margin-top' : -popMargTop,'margin-left' : -popMargLeft}).fadeIn(10);
            $("#boxMX").click(function() { $(this).remove(); });  
            };
            alertMX("Safe To Use, Legitimate Website");
        }
        else{
            console.log("PHISH");
            $("<style type='text/css'>#boxMX{display:none;background: #ccffcc;padding: 10px;border: 5px solid #0d0909;float: left;font-size: 1.2em;position: fixed;top: 50%; left: 50%;z-index: 99999;box-shadow: 2px 2px 20px #999; -moz-box-shadow: 0px 0px 20px #999; -webkit-box-shadow: 0px 0px 20px #999; border-radius:6px 6px 6px 6px; -moz-border-radius: 6px; -webkit-border-radius: 6px; font:13px Amatic SC, Helvetica, sans-serif; padding:6px 6px 4px;width:300px; color: white;}</style>").appendTo("head");

            function alertMX(t) {
            $( "body" ).append( $( "<div id='boxMX'><p class='msgMX' align=\"center\" style=\"font-family:Amatic;color:black;font-size:20px\"><img src='https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png' alt='hello' height=30px width=30px><br>Beware, PHISHING Website</p></div>" ) );
            //$('.msgMX').text(t); 
            var popMargTop = ($('#boxMX').height() + 24) / 2, popMargLeft = ($('#boxMX').width() + 24) / 2; 
            $('#boxMX').css({ 'margin-top' : -popMargTop,'margin-left' : -popMargLeft}).fadeIn(10);
            $("#boxMX").click(function() { $(this).remove(); });  
            };
            alertMX("Beware, PHISHING Website");
        }
    });
});