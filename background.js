chrome.webRequest.onBeforeRequest.addListener(function(details) 
{
    console.log(details.type);
    if (details.tabId == -1)
    {
                return;
    }
    if ("type" in details && ['main_frame', 'sub_frame'].indexOf(details.type) !== -1)
    {
        if (details.frameId == 0)
        {
            return {cancel: DetectPhish(details.url) != -1};
        }
    }            
},{urls: ["<all_urls>"]});

function DetectPhish(url)
{
    console.log(url);
    return url.indexOf("www.facebook.com");
}

   