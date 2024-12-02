export { }
chrome.runtime.onMessage.addListener(async (msg) => {
    console.log("[BionicReader] Received message:", msg.type);
    switch (msg.type) {
        case "reader": {
            console.log("reader case");
        }
        case "default": {
            console.log("default case");
        }
    }
});