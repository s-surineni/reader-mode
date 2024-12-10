export { }
import Sample from "./sample";
import { Readability } from "@mozilla/readability";
import browser from "webextension-polyfill";
import { patchDocument, unPatchDocument } from "./pageview/patching";

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
        injectSidebar();
        patchDocument();
        document.body.classList.add('pageview');
    } else {
        destroySidebar();
        unPatchDocument();
        document.body.classList.remove('pageview');
    }
}

function getPageContent() {
    Sample();
    // const selection = window.getSelection().toString().trim();
    // if (selection) {
    //     return selection;
    // }
    const readability = new Readability(document.cloneNode(true), {
        charThreshold: 20,
    });
    const article = readability.parse();
    return { textContent: article.textContent, content: article.content };
    // return { textContent: "Hi", content: "hello" };
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