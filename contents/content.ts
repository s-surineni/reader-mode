export { }
import Sample from "./sample";
import { Readability } from "@mozilla/readability";
import browser from "webextension-polyfill";
import { patchDocumentStyle, unPatchDocumentStyle } from "./styleChanges";

chrome.runtime.onMessage.addListener(async (msg) => {
    console.log("ironman  Received message:", msg.type);
    switch (msg.type) {
        case "reader": {
            toggleReaderMode();
        }
        case "default": {
            console.log("ironman default case");
        }
    }
});


function toggleReaderMode() {
	if (!document.body.classList.contains('pageview')) {
        patchDocumentStyle();
        // injectSidebar();
        document.body.classList.add('pageview');
    } else {
        document.body.classList.remove('pageview');
        unPatchDocumentStyle();
        // destroySidebar();
    }
}


function injectSidebar() {
    const sidebarIframe = document.createElement("iframe");
    sidebarIframe.src = browser.runtime.getURL("/contents/index.html");
    // sidebarIframe.src =
    // 	"https://lostechies.com/derekgreer/2017/05/25/hello-react-a-beginners-setup-tutorial/";
    sidebarIframe.className = "sidebar";
    sidebarIframe.setAttribute("id", "lindylearn-annotations-sidebar");
    sidebarIframe.setAttribute("scrolling", "no");
    sidebarIframe.setAttribute("frameBorder", "0");


    document.body.append(sidebarIframe);
}

function destroySidebar() {
    const existingSidebar = document.getElementById(
		'lindylearn-annotations-sidebar'
	);
    existingSidebar.parentNode.removeChild(existingSidebar);
}