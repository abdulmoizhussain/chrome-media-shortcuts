// function openTab() {
//   console.log("aaaaaaaaa");
//   return function (info, tab) {
//     let text = info.selectionText;
//     let redditLink = "https://www.reddit.com/top/?t=all";
//     chrome.tabs.create({
//       index: tab.index + 1, url: redditLink,
//       selected: true
//     });
//   };
// }
// chrome.contextMenus.create({
//   "title": "View Top Posts From This Subreddit",
//   "contexts": ["selection"],
//   "onclick": openTab()
// });


// background.js
// let color = '#3aa757';
// chrome.runtime.onInstalled.addListener(() => {
//   console.log(chrome)
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

// chrome.action.onClicked.addListener((tab, a2, a3, a4) => {
//   console.log(tab, a2, a3, a4);
//   //TODO toggle dark mode in the tab
// });

chrome.commands.onCommand.addListener(function (command) {
  // chrome.tabs.query({ url: "http://thewebpageiamtryingtoaccess.com/*" }, function (tab) {
  // chrome.tabs.query({ url: "https://www.youtube.com/watch?v=iR0CZoUfun8&list=PL7zbemS0K3KVjhm88HhgiumZjFTT2BO6l&index=*" }, function (tab) {
  chrome.tabs.query({ url: "https://www.youtube.com/watch?v=*", status: "complete" }, function (tabs) {
    if (!tabs.length) {
      return;
    }

    tabs.sort((tabX, tabY) => tabX.id - tabY.id);

    const latestTab = tabs[tabs.length - 1];

    chrome.scripting.executeScript({
      target: { tabId: latestTab.id },
      args: [command],
      function: function (shortcutKeyCommand) {
        if (typeof streamKeys2_Video === "undefined") {
          var streamKeys2_Video = document.querySelector(".video-stream.html5-main-video");
        }

        if (shortcutKeyCommand === "toggle_play") {
          streamKeys2_Video.paused ? streamKeys2_Video.play() : streamKeys2_Video.pause();
        }
        else if (shortcutKeyCommand === "forward") {
          streamKeys2_Video.currentTime += 10;
        }
        else if (shortcutKeyCommand === "backward") {
          streamKeys2_Video.currentTime -= 10;
        }
        else if (shortcutKeyCommand === "toggle_mute") {
          document.querySelector(".ytp-mute-button.ytp-button").click();
        }
      }
    });
  });
});




// manifest.json
// "browser_action": {
//   "default_icon": "images/icon.png"
// },
// "icons": {
//   "16": "images/icon.png",
//   "32": "images/icon.png",
//   "48": "images/icon.png",
//   "128": "images/icon.png"
// }


// "background": {
// "scripts": [
//   "js/background.js"
// ]


// "_execute_action": {
//   "suggested_key": "Ctrl+Shift+L",
//   "description": "Backward YouTube Video",
//   "global": true
// }
// "action": {}