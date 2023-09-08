const butInstall = document.getElementById("buttonInstall");
let defferdPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  defferdPrompt;
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  butInstall.style.display = "none";
  if (defferdPrompt) {
    defferdPrompt.prompt();
    const choiceResult = await defferdPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the prompt");
    } else {
      console.log("user denied the prompt");
    }
    defferdPrompt = null;
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
    console.log('appinstalled', event);
});
