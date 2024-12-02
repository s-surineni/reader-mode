export { }
import  Sample  from "./sample";
// import Readability from "readability";
function getPageContent() {
    Sample();
    // const selection = window.getSelection().toString().trim();
    // if (selection) {
    //     return selection;
    // }
    // const readability = new Readability(document.cloneNode(true), {
    //     charThreshold: 20,
    // });
    // const article = readability.parse();
    // return { textContent: article.textContent, content: article.content };
    return { textContent: "Hi", content: "hello" };
}

chrome.runtime.onMessage.addListener(async (msg) => {
    console.log("ironman [BionicReader] Received message:", msg.type);
    switch (msg.type) {
        case "reader": {
            const { content, textContent } = getPageContent();
            console.log("ironman content:", content);
            console.log("ironman textContent:", textContent);
        }
        case "default": {
            console.log("ironman default case");
        }
    }
});