function sortTabsInDescendingOrderById(tabX, tabY) {
  return tabY.id - tabX.id;
}

function javascriptToInject(shortcutKeyCommand) {
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

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ url: "https://www.youtube.com/watch?v=*", status: "complete" }, function (tabs) {
    if (!tabs.length) {
      return;
    }

    tabs.sort(sortTabsInDescendingOrderById);

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: javascriptToInject,
      args: [command],
    });
  });
});
