import browser from "webextension-polyfill";
// adds css files
export function patchDocument() {
	// patchMediaRules(document);
	insertPageViewStyle();
	insertOverrideRules();
}

function insertPageViewStyle() {
	// set start properties for animation immediately
	document.body.style.width = '100%';
	document.body.style.magin = '0';

	createStylesheetLink(browser.runtime.getURL('/contents/pageview/content.css'));
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
	const cssUrls = [url]
	cssUrls.map((url) => {
		createStylesheetLink(url);
	})
}
const overrideClassname = 'lindylearn-document-override';

function createStylesheetLink(url) {
	var link = document.createElement('link');
	link.className = overrideClassname;
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	// link.crossOrigin = 'anonymous';
	document.head.appendChild(link);
}

export function unPatchDocument(document) {
	document
		.querySelectorAll('.pageview-media-override')
		.forEach((e) => e.remove());
}