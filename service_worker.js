let operateActiveTab = false;
let targeted_tab_id = null;

function tabListener(listenerType, tabId, changeInfo, tab) {
  // function tabListener() {
  console.log(listenerType, tabId, changeInfo, tab);

  chrome.tabs.query({ url: "https://www.youtube.com/watch?v=*", status: "complete" }, function (tabs) {
    console.group("chrome.tabs.query");
    console.log(tabs);
    console.groupEnd();
    if (!tabs.length) {
      targeted_tab_id = null;
      return;
    }

    if (operateActiveTab) {
      const targetedTab = tabs.filter(tab => tab.active)[0];
      if (targetedTab) {
        targeted_tab_id = targetedTab.id;
      }
      else {
        tabs.sort(sortTabsInDescendingOrderById);
        targeted_tab_id = tabs[0].id;
      }
    }
    else {
      tabs.sort(sortTabsInDescendingOrderById);
      targeted_tab_id = tabs[0].id;
    }
  });
}

chrome.tabs.onActivated.addListener(function () {
  console.log(arguments);
});

chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => { tabListener("onCreated", tabId, changeInfo, tab); });
chrome.tabs.onRemoved.addListener((tabId, changeInfo, tab) => { tabListener("onRemoved", tabId, changeInfo, tab); });
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete")
    tabListener("onUpdated", tabId, changeInfo, tab);
});

function sortTabsInDescendingOrderById(tabX, tabY) {
  return tabY.id - tabX.id;
}

function javascriptToInject(shortcutKeyCommand) {
  console.group("javascriptToInject");
  console.log(shortcutKeyCommand);
  console.groupEnd();
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
  else if (shortcutKeyCommand === "next_video") {
    document.querySelector(".ytp-next-button.ytp-button").click();
  }
  else if (shortcutKeyCommand === "prev_video") {
    document.querySelector(".ytp-prev-button.ytp-button")?.click();
  }
}

chrome.storage.sync.get({
  operateActiveTab: false
}, function (items) {
  operateActiveTab = items.operateActiveTab;
});

chrome.storage.onChanged.addListener(function (changes, _namespace) {
  operateActiveTab = changes["operateActiveTab"]["newValue"];
});

chrome.commands.onCommand.addListener(function (command) {
  console.group();
  console.log(targeted_tab_id);
  if (typeof targeted_tab_id !== "number") {
    console.log("returning");
    console.groupEnd();
    return;
  }
  console.groupEnd();

  chrome.scripting.executeScript({
    target: { tabId: targeted_tab_id },
    function: javascriptToInject,
    args: [command],
  });
});

// first time
tabListener();