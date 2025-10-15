
      const toggle = document.getElementById("btn");
      const body = document.body;

      function updateBackground() {
        if (toggle.checked) {
          body.style.background = "linear-gradient(45deg, #b5a623ff, #d98038ff)";
        } else {
          body.style.background = "linear-gradient(45deg, #778b9fff, #161718ff)";
        }
      }
      updateBackground();
      toggle.addEventListener("change", updateBackground);