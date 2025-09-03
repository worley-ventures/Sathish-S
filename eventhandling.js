  
  window.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector("a-scene");
    const logoModel = document.querySelector("#logo");
    const Buttons = {
      callBtn: document.querySelector("#callBtn"),
      mailBtn: document.querySelector("#mailBtn"),
      siteBtn: document.querySelector("#siteBtn"),
      pinBtn: document.querySelector("#pinBtn")
    }
  
    // AR system events
    sceneEl.addEventListener("loaded", () => {
      //log("Scene loaded, MindAR system ready");
    });
  
    sceneEl.addEventListener("arReady", () => {
      //log("MindAR is ready");
    });
  
    // AR target events
    const target = sceneEl.querySelector("[mindar-image-target]");
    target.addEventListener("targetFound", () => {
      //log("Target Found!");

      /*
      //button pop animation 
      Buttons.forEach((btn, i) => {
        //log("Button " + i + " found");
        setTimeout(() => {
          btn.emit("pop");
          //log("Button " + i + " popped");
        }, i * 300); // 300ms delay between each
      });*/
  
      // Scale up animation
      logoModel.setAttribute("animation__scale", {
        property: "scale",
        to: "0.15 0.15 0.15",
        dur: 1500,
        easing: "easeOutElastic"
      });
  
      logoModel.addEventListener("animationcomplete__scale", () => {
        //log("Scale complete → Moving left...");
        logoModel.setAttribute("animation__move", {
          property: "position",
          to: "-1 0 0",
          dur: 1000,
          easing: "easeInOutSine"
        });
      });
  
      logoModel.addEventListener("animationcomplete__move", () => {
        //log("Move complete → Playing idle animation");
        logoModel.setAttribute("animation__rotate", {
          property: "rotation",
          to: "0 360 0",
          dur: 5000,
          easing: "linear", 
          loop: true
        });
      });
    });
  
    target.addEventListener("targetLost", () => {
      //log("Target Lost!");
      logoModel.removeAttribute("animation__scale");
      logoModel.removeAttribute("animation__move");
      logoModel.removeAttribute("animation-mixer");
      logoModel.setAttribute("scale", "0 0 0");
      logoModel.setAttribute("position", "0 0 0");
      logoModel.setAttribute("rotation", "0 0 0");

      Buttons.forEach(btn => {
        btn.setAttribute("scale", "0 0 0");
      });
    });
  
    // Buttons
    Buttons.callBtn.addEventListener("click", () => {
      //log("Call clicked");
      window.location.href = "tel:9842813292";
    });
  
    Buttons.mailBtn.addEventListener("click", () => {
      //log("Mail clicked");
      window.location.href = "mailto:sathishkumar@worleyventure.com";
    });
  
    Buttons.siteBtn.addEventListener("click", () => {
      //log("Site clicked");
      window.location.href = "https://worleyventure.com";
    });
  
    Buttons.pinBtn.addEventListener("click", () => {
      //log("Pin clicked");
      window.location.href = "https://maps.app.goo.gl/qetcCErj4JorJ8Z26";
    });
  });