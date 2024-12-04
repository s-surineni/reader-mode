export { }
import  Sample  from "./sample";
import { Readability } from "@mozilla/readability";
import {
    patchDocumentStyle, createStylesheetLink
} from "./styleChanges";
import browser from "webextension-polyfill";

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

function toggleReaderMode() {
    console.log("ironman toggleReaderMode");
    // patchDocumentStyle();
    // document.body.classList.add("pageview");
    createStylesheetLink(
        browser.runtime.getURL("/contents/content.css")
    );
    const notice = document.createElement("div");
	notice.innerHTML = "Sidebar";
	document.body.append(notice);
	notice.className = "sidebar";
//     document.body.innerHTML = `
//     <html>

//         <body>You are in reader mode
//         </body>
//     </html>
// `;
}

// function addStyles(element, styles) {
// 	for (id in styles) {
// 		element.style[id] = styles[id];
// 	}
// }