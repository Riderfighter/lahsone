chrome.browserAction.onClicked.addListener(e => {
    chrome.runtime.reload();
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    details => {
        var headers = details.requestHeaders;
        for (let i = 0; i < details.requestHeaders.length; i++) {
            if (["Origin", "Sec-Fetch-Mode", "Sec-Fetch-Site"].includes(headers[i].name)) {
                headers.splice(i, 1);
                i--;
            }
        }
        if (details.url.includes("aeries"))
            headers.push({
                name: "User-Agent",
                value: "Aeries_StudentParent/2.2.3 (com.aeries.psp1; build:4117; iOS 13.1.2) Alamofire/4.5.0"
            });
        return {requestHeaders: headers};
    },
    {
        urls: ['*://mvla.asp.aeries.net/*', '*://bell.plus/*', '*://announcements.catapultcms.com/*'],
        types: ["xmlhttprequest"]
    },
    ['blocking', 'requestHeaders']
);

chrome.webRequest.onHeadersReceived.addListener(
    details => {
        details.responseHeaders.push({name: 'Access-Control-Allow-Origin', value: details.initiator});
        details.responseHeaders.push({name: 'Access-Control-Allow-Credentials', value: 'true'});
        return {responseHeaders: details.responseHeaders}
    },
    {
        urls: ['*://mvla.asp.aeries.net/*', '*://bell.plus/*', '*://announcements.catapultcms.com/*'],
        types: ["xmlhttprequest"]
    },
    ['blocking', 'responseHeaders']
);
