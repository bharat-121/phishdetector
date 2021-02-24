
var callback = function(details) {
     console.log('Default background');
     
  };
  var filter = {urls: ["<all_urls>"]};
  var opt_extraInfoSpec = [];
  
  chrome.webRequest.onBeforeRequest.addListener(
          callback, filter, opt_extraInfoSpec);