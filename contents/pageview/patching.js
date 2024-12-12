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
	document.body.style.margin = '0';
	// set animation style inline to have ease-out
	// easeOutExpo from easings.net
	document.body.style.transition = `margin-top 0.15s cubic-bezier(0.16, 1, 0.3, 1),
	margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1),
	width 0.3s cubic-bezier(0.16, 1, 0.3, 1)`;
	createStylesheetLink(browser.runtime.getURL('/contents/pageview/content.css'));
	var el = document.createElement('div');
	el.className = `${overrideClassname} body-background`;
	el.style.height = `${document.body.scrollHeight}px`;
	const siteBodyColor = window.getComputedStyle(
		document.body
	).backgroundColor;
	el.style.backgroundColor =
		siteBodyColor === 'rgba(0, 0, 0, 0)' ? 'white' : siteBodyColor;
	document.body.appendChild(el);
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

export function unPatchDocument() {
	document
		.querySelectorAll(`.${overrideClassname}`)
		.forEach((e) => e.remove());
}