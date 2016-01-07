// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    console.log("Amazon url intercepted: " + info.url);
   	return;
   	//return {redirectUrl: "https://www.amazon.com/?tag=0x5347-20"};
  },
  // filters
  {
    urls: [
      "*://*.amazon.com/*"
    ]
  });