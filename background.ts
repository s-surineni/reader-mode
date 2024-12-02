export {}
console.log("ironman Hello from background script!")
console.log("ironman messaging")

chrome.action.onClicked.addListener(() => {
  console.log(`action clicked`)
})

const handleClick = (tab) => {
    console.log("clicked", tab.id);
    if (!tab.id) throw new Error("tab id not found");
    chrome.tabs.sendMessage(tab.id, {
      name: "show-dialog"
    });
  };

  if (chrome.action != undefined) {
    chrome.action.onClicked.addListener(handleClick);
  } else {
    chrome.browserAction.onClicked.addListener(handleClick);
  }

chrome.action.onClicked.addListener((tab) => {
    console.log(`ironman action clicked`)
    chrome.tabs.sendMessage(tab.id, {
        type: "reader",
      });
  })
