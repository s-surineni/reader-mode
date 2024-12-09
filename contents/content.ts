export { }
import Sample from "./sample";
import { Readability } from "@mozilla/readability";
import {
    patchDocumentStyle, createStylesheetLink
} from "./styleChanges";
import browser from "webextension-polyfill";
import { beautifyDocument, unBeautifyDocument } from "./pageview/patching";

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

chrome.runtime.onMessage.addListener(async (msg) => {
    console.log("ironman [BionicReader] Received message:", msg.type);
    switch (msg.type) {
        case "reader": {
            toggleReaderMode();
        }
        case "default": {
            console.log("ironman default case");
        }
    }
});

function addSidebar() {
    document.body.classList.add("pageview");
    console.log("ironman toggleReaderMode");
    createStylesheetLink(
        browser.runtime.getURL("/contents/content.css")
    );
    const notice = document.createElement("div");
    notice.innerHTML = "Sidebar";
    document.body.append(notice);
    notice.className = "sidebar";
}

function toggleReaderMode() {
    const existingSidebar = document.getElementById(
        "lindylearn-annotations-sidebar"
    );
    if (!existingSidebar) {
        injectSidebar();
        beautifyDocument(document);
    } else {
        destroySidebar(existingSidebar);
        unBeautifyDocument(document);
    }

    // patchDocumentStyle();
    // document.body.classList.add("pageview");

    //     document.body.innerHTML = `
    //     <html>

    //         <body>You are in reader mode
    //         </body>
    //     </html>
    // `;
}

function injectSidebar() {
    document.body.classList.add("pageview");
    ////////////////////////////////////

    createStylesheetLink(
        browser.runtime.getURL("/contents/content.css")
    );
    ////////////////////////////////////
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

function destroySidebar(existingSidebar) {
    document.body.classList.remove("pageview");

    existingSidebar.parentNode.removeChild(existingSidebar);
}