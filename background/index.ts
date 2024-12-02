export {}

import "@plasmohq/messaging/background"

import { startHub } from "@plasmohq/messaging/pub-sub"
console.log("ironman messaging")
console.log(`BGSW - Starting Hub`)
startHub()


chrome.action.onClicked.addListener((tab) => {
  console.log("ironman onClicked")
    chrome.tabs.sendMessage(tab.id, {
        type: "reader",
      });
})

// chrome.action.onClicked.addListener((tab) => {
//     chrome.tabs.sendMessage(tab.id, {
//       type: "reader",
//     });
//   });