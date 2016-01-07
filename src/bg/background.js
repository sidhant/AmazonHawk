chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
	  	return handleAffRedirect(details);
	},
  // filters
  {
    urls: [
      "*://www.amazon.com/", 
      "*://www.amazon.com/gp/product/*",
      //"*://www.amazon.com/*/dp/*" //TODO: If incoming OS clicked link resulting in new tab then invoke this
    ]
  },
  ["blocking"]);

function handleAffRedirect(info) {
	var URL = info.url;

    console.log("Amazon url match: " + info.url);
   	
   	 // ignore links with these strings in them
    var filter = "(sa-no-redirect=)"
               //+ "|(redirect=true)"
               + "|(redirect.html)"
               + "|(r.html)"
               + "|(/gp/dmusic/cloudplayer)"
               + "|(/gp/photos)"
               + "|(/gp/wishlist)"
               + "|(/ap/mfa)"
               + "|(aws.amazon.com)"
               + "|(read.amazon.com)"
               + "|(login.amazon.com)"
               + "|(payments.amazon.com)"
               + "|(amazon.com/clouddrive)"
               + "|(ajax-handlers)"
               + "|(/gp/product/).*?(/uedata/)";

   	if (URL.match(filter) != null)
   	{
   		console.log("Filtering " + URL);
   		return;
   	}

   if (URL.match("(www.amazon.com)[/]?$") != null)
   	{
   		console.log("Returning home page redirect");
   		return {redirectUrl: "https://www.amazon.com/ref=as_li_ss_tl?_encoding=UTF8&camp=1789&creative=390957&linkCode=ur2&tag=sp4-20&linkId=6MV37LL6YMB742RF"};
   	}

   	//Check if there is already a GET parameter
   	//Get latter part of URL
   	urlPath = URL.split("www.amazon.com")[1];
   	if (urlPath.match("\\?"))
   		newURL = URL + "&" + "camp=1789&creative=390957&linkCode=ur2&tag=sp4-20";
   	else
   		newURL = URL + "?" + "camp=1789&creative=390957&linkCode=ur2&tag=sp4-20";

   	console.log("New URL: " + newURL);
   	return {redirectUrl: newURL};
   	//return {redirectUrl: "https://www.amazon.com/?tag=0x5347-20"};
  }