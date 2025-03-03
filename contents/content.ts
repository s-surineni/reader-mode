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


async function toggleReaderMode() {
    const isInPageView = document.body.classList.contains("pageview");
    if (!isInPageView) {
        await enableReaderMode();
    } else {
        await disableReaderMode();
    }
}

async function enableReaderMode() {
    patchDocumentStyle();
    // const sidebarIframe = injectSidebar();

    // listen and react to annotation events from the sidebar iframe
    // createAnnotationListener(sidebarIframe);
    // createSelectionListener(sidebarIframe);

    // make visible once set up
    document.body.classList.add("pageview");

    // allow exiting pageview by clicking on background surrounding pageview (bare <html>)
    document.onclick = (event) => {
        if (event.target.tagName === "HTML") {
            toggleReaderMode();
        }
    };
}
async function disableReaderMode() {
    // disable page view exiting
    document.onclick = null;

    // immediately hide
    document.body.classList.remove("pageview");

    unPatchDocumentStyle();
    // removeSidebar();

    // removeAnnotationListener();
    // removeSelectionListener();
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