let latestTabId = null;

function tabListener(listenerType, tabId, changeInfo, tab) {
  // console.log(listenerType, tabId, changeInfo, tab);

  chrome.tabs.query({ url: "https://www.youtube.com/watch?v=*" }, function (tabs) {
    console.group("chrome.tabs.query");
    console.log(tabs);
    console.groupEnd();
    if (!tabs.length) {
      latestTabId = null;
      return;
    }

    tabs.sort(sortTabsByIdInDescendingOrder);
    latestTabId = tabs[0].id;
  });
}

chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => {
  tabListener("onCreated", tabId, changeInfo, tab);
});
chrome.tabs.onRemoved.addListener((tabId, changeInfo, tab) => {
  tabListener("onRemoved", tabId, changeInfo, tab);
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    tabListener("onUpdated", tabId, changeInfo, tab);
  }
});

function sortTabsByIdInDescendingOrder(tabX, tabY) {
  return tabY.id - tabX.id;
}

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
  console.log(latestTabId);
  if (typeof latestTabId !== "number") {
    console.log("returning");
    console.groupEnd();
    return;
  }
  console.groupEnd();

  chrome.scripting.executeScript({
    target: { tabId: latestTabId },
    function: javascriptToInject,
    args: [command],
  });
});

// first time
tabListener();
