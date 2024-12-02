export { }
chrome.runtime.onMessage.addListener(async (msg) => {
    console.log("ironman [BionicReader] Received message:", msg.type);
    switch (msg.type) {
        case "reader": {
            console.log("ironman reader case");
        }
        case "default": {
            console.log("ironman default case");
        }
    }
});