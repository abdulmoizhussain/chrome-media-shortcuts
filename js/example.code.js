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

// chrome.tabs.query({ url: "http://thewebpageiamtryingtoaccess.com/*" }, function (tab) {
// chrome.tabs.query({ url: "https://www.youtube.com/watch?v=iR0CZoUfun8&list=PL7zbemS0K3KVjhm88HhgiumZjFTT2BO6l&index=*" }, function (tab) {


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


// "action": {
//   "default_title": "My Bookmarks",
//   "default_icon": "icon.png",
// }

// "permissions": [
//   "contextMenus",
//   "activeTab",
//   "tabs",
// ]