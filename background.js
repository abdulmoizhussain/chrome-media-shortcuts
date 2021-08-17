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

chrome.commands.onCommand.addListener((command) => {
  // console.log(command, chrome.tabs);
  // chrome.tabs.query({ url: "http://thewebpageiamtryingtoaccess.com/*" }, function (tab) {
  chrome.tabs.query({ url: "https://www.youtube.com/watch?v=iR0CZoUfun8&list=PL7zbemS0K3KVjhm88HhgiumZjFTT2BO6l&index=*" }, function (tab) {
    // reload tab with one of the methods from linked answer
    // chrome.tabs.reload(tab[0].id);
    chrome.scripting.executeScript({
      target: { tabId: tab[0].id },
      files: ["host.js"],
    });

    // chrome.scripting.executeScript(tab[0].id, {
    //   file: 'inject.js'
    // });
  });

  //TODO handle event
});