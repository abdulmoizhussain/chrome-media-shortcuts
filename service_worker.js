
class TabState {
  tabId = null;
  allTabs = [];

  setLatestTabId(tabId) {
    this.tabId = tabId;
  }
  getLatestTabId() {
    return this.tabId;
  }
  static sortTabsByTimestampInDscOrder(tabX, tabY) {
    return tabY.timestamp - tabX.timestamp;
  }
  addNewTab(tabId) {
    const foundTabIndex = this.allTabs.findIndex(tab => tab.id === tabId);

    if (foundTabIndex > -1) {
      this.allTabs[foundTabIndex].timestamp = new Date().getTime();
    }
    else {
      this.allTabs.push({
        id: tabId,
        timestamp: new Date().getTime(),
      });
    }

    this.allTabs.sort(TabState.sortTabsByTimestampInDscOrder);

    this.setLatestTabId(this.allTabs[0].id);
  }
  removeTabById(tabId) {
    const foundTabIndex = this.allTabs.findIndex(tab => tab.id === tabId);

    if (foundTabIndex > -1) {
      this.allTabs.splice(foundTabIndex, 1);
      this.allTabs.sort(TabState.sortTabsByTimestampInDscOrder);
      const [latestTab] = this.allTabs;
      if (latestTab) {
        this.setLatestTabId(latestTab.id);
      }
      else {
        // TODO this.tabid = null;
      }
    }
  }
}



// /.+ youtube\.com\/watch\?v=.+/.exec("https://www.youtube.com/watch?v=Ev8Hg");
const YOU_TUBE_WATCH_URL_REGEX = /.+youtube\.com\/watch\?v=.+/;
const tabStatuses = ["loading", "complete"];
const tabState = new TabState();
// let latestTabId = null;

// function listenerFindTabs(tabs) {
//   // console.group("chrome.tabs.query");
//   // console.log(tabs);
//   // console.groupEnd();
//   if (!tabs.length) {
//     tabState.setLatestTabId(null);
//     latestTabId = null;
//     return;
//   }
//   tabs.sort(sortTabsByIdInDescendingOrder);
//   latestTabId = tabs[0].id;
//   tabState.setLatestTabId(tabs[0].id);
// }

// function tabListener(listenerType, tabId, changeInfo, tab) {
//   // console.log(listenerType, tabId, changeInfo, tab);
//   chrome.tabs.query(
//     {
//       url: "https://www.youtube.com/watch?v=*",
//       discarded: false,
//     },
//     listenerFindTabs
//   );
// }

// chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => {
//   console.log("onCreated", tabId, changeInfo, tab);
//   tabListener("onCreated", tabId, changeInfo, tab);
// });
chrome.tabs.onRemoved.addListener((tabId, changeInfo, tab) => {
  // console.log("onRemoved", tabId);
  // if (tabId === tabState.getLatestTabId()) {
  tabState.removeTabById(tabId);
  // if (tabId === latestTabId) {
  //   tabListener("onRemoved", tabId, changeInfo, tab);
  // }
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("onUpdated", tabId, changeInfo, tab);
  if (tabStatuses.includes(changeInfo.status) && YOU_TUBE_WATCH_URL_REGEX.test(tab.url)) {
    // tabListener("onUpdated", tabId, changeInfo, tab);

    // latestTabId = tabId;
    tabState.addNewTab(tabId);
  }
});

// function sortTabsByIdInDescendingOrder(tabX, tabY) {
//   return tabY.id - tabX.id;
// }

function javascriptToInject(shortcutKeyCommand) {
  if (typeof mediaShortcutsVideoTag === "undefined") {
    var mediaShortcutsVideoTag = document.querySelector(".video-stream.html5-main-video");
  }

  if (shortcutKeyCommand === "toggle_play") {
    mediaShortcutsVideoTag.paused ? mediaShortcutsVideoTag.play() : mediaShortcutsVideoTag.pause();
  }
  else if (shortcutKeyCommand === "forward") {
    mediaShortcutsVideoTag.currentTime += 10;
  }
  else if (shortcutKeyCommand === "backward") {
    mediaShortcutsVideoTag.currentTime -= 10;
  }
  else if (shortcutKeyCommand === "toggle_mute") {
    document.querySelector(".ytp-mute-button.ytp-button").click();
  }
  else if (shortcutKeyCommand === "next_video") {
    document.querySelector(".ytp-next-button.ytp-button").click();
  }
  else if (shortcutKeyCommand === "prev_video") {
    document.querySelector(".ytp-prev-button.ytp-button")?.click();
  }
}

chrome.commands.onCommand.addListener(function (command) {
  console.group();

  const latestTabIdLocal = tabState.getLatestTabId();
  // const latestTabIdLocal = latestTabId;

  console.log(latestTabIdLocal);

  if (typeof latestTabIdLocal !== "number") {
    console.log("returning");
    console.groupEnd();
    return;
  }
  console.groupEnd();

  chrome.scripting.executeScript({
    target: { tabId: latestTabIdLocal },
    function: javascriptToInject,
    args: [command],
  });
});
