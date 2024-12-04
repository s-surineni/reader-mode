export {}

chrome.action.onClicked.addListener((tab) => {
    console.log(`ironman action clicked`)
    chrome.tabs.sendMessage(tab.id, {
        type: "reader",
      });
  })
