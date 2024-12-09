import browser from "webextension-polyfill";
export function beautifyDocument(document) {
	// patchMediaRules(document);

	insertOverrideRules(document);
}

function insertOverrideRules(document) {
    /*
	const cssUrls = [...document.getElementsByTagName('link')]
		.filter((elem) => elem.rel === 'stylesheet')
		.map((elem) => elem.href);

	console.log(cssUrls);

	cssUrls.forEach((url) => {
		var link = document.createElement('link');
		link.className = 'pageview-media-override';
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = `https://us-central1-lindylearn2.cloudfunctions.net/getCssOverrides?cssUrl=${encodeURIComponent(
			url
		)}&conditionScale=${1.6}`;
		link.crossOrigin = 'anonymous';
		document.head.appendChild(link);
	});
    */
   console.log('ironman beautifydoc');
    const url = browser.runtime.getURL("/contents/pageview/index.css")
    var link = document.createElement('link');
    link.className = 'pageview-media-override';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}