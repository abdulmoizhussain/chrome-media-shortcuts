document.getElementById("id_configure_shortcuts").addEventListener("click", function () {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts", active: true });
});

chrome.storage.sync.get({
  operateActiveTab: false
}, function (items) {
  document.getElementById("workOnActiveTab").checked = items.operateActiveTab;
});

document.getElementById("workOnActiveTab").addEventListener("change", function (event) {
  chrome.storage.sync.set({
    operateActiveTab: event.target.checked
  });
});