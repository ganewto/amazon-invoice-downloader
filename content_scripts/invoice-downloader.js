function findAndDownloadInvoices() {
	var links = document.links;
	for (var i = 0; i < links.length; i++) {
		if (links[i].text == "Invoice") { 
			var downloading = browser.runtime.sendMessage({
				"url": links[i].href
			});
		}
	}
}
