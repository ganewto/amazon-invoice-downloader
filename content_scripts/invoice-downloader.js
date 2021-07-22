function searchQueryParam(param, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = regex.exec(search);
    return (query);
}

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}
function url_redirect(url){
    var X = setTimeout(function(){
        window.location.replace(url);
        return true;
    },300);

    if( window.location = url ){
        clearTimeout(X);
        return true;
    } else {
        if( window.location.href = url ){
            clearTimeout(X);
            return true;
        }else{
            clearTimeout(X);
            window.location.replace(url);
            return true;
        }
    }
    return false;
};
function findAndDownloadInvoices() {
    const urlParams = new URLSearchParams(document.location.href);
    var count = 1;
    var links = document.links;
    console.log (`Found ${links.length} links on page`)

    for (var i = 0; i < links.length; i++) {
	mode = 0;
	if (links[i].text == "Invoice") { 
	    var l = links[i].parentNode.parentNode.previousSibling.previousSibling;
	    console.log(`About to download ${links[i]}`);
	    var downloading = browser.runtime.sendMessage({
		"url": links[i].href,
		"alias": l.children[1].children[0].textContent
	    });
	} else {
	    var matched = 0;
	    var q = links[i];
	    if (q.text.search("ORDER #") > 0) {
		let match = /ORDER # (D\d+-\d+-\d+)/.exec(q.text);
		if (match.index >= 0) {
		    console.log(`FIRST: About to download from ORDER ${q}`);
		    var downloading = browser.runtime.sendMessage({
			"url": links[i].href,
			"alias": match[1]
		    });
		    matched = 1;
		}
	    }
	    if ((matched == 0) && ((q.text.search("Order Details") > 0) ||
				   (q.text.search("View order details") > 0))) { // 2017
		var parentText = q.parentNode.textContent;
		// Double check that there is no invoice (allowing this section to be debugged
		// separately from the logic above
		if (parentText.search("Invoice") < 0) {
		    matched = 2;
		    var l = q.parentNode.parentNode.previousSibling.previousSibling;
//		    console.log(`Scanning Parent ${l.children[1].children[0].textContent} for ${links[i].href}`);
		    console.log(`SECOND: About to download from Order Details${q}`);
		    var downloading = browser.runtime.sendMessage({
			"url": q.href,
			"alias": l.children[1].children[0].textContent
		    });
		}
	    }
	    if (matched == 0) {
		var regex = new RegExp("(orderID=D?[0-9]*-[0-9]*-[0-9]*)");
		var r = regex.exec(q);
		if (r) {
		    if (mode > 0) {
			console.log(`ERROR: downloading B twice ${q}`)
		    } else {
			console.log(`UNIQUE THIRD: downloading  ${q}`)
		    }
		    matched = 3
		    console.log(`THIRD: About to download from orderID= match ${q}`);
		    var downloading = browser.runtime.sendMessage({
			"url": "https://www.amazon.com/gp/css/summary/print.html?" + r[1]
		    });
		}
	    }
	}
    }
}
function findAndDownloadInvoicesAndRetreat() {
    const urlParams = new URLSearchParams(document.location.href);
    var startIndex = parseInt(urlParams.get("startIndex"));
    findAndDownloadInvoices()
    if (startIndex > 0) {
	startIndex -= 10;
	if (startIndex < 0) {
	    startIndex = 0;
	}
	var q = document.location.href;
	var r = searchQueryParam('startIndex', q)
	if (r) {
	    q = replaceQueryParam('startIndex', startIndex, q);
	} else
	    q += "&search=&startIndex=10";
	setTimeout(function(){document.location.href = q},2000);
    }
}
function findAndDownloadInvoicesAndAdvance() {
    const urlParams = new URLSearchParams(document.location.href);
    var startIndex = parseInt(urlParams.get("startIndex"));
    findAndDownloadInvoices()
    startIndex += 10;
    var q = document.location.href;
    var r = searchQueryParam('startIndex', q)
    if (r) {
	q = replaceQueryParam('startIndex', startIndex, q);
    } else
	q += "&search=&startIndex=10";
    setTimeout(function(){document.location.href = q},2000);
}
