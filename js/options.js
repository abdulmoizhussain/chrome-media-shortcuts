
document.getElementById("id_configure_shortcuts").addEventListener("click", function () {
  chrome.tabs.create({ url: "chrome://extensions/shortcuts", active: true });
});
