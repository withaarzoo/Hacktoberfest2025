document.addEventListener("DOMContentLoaded", () => {
  // --- Password Visibility Toggle ---
  const passwordToggle = document.querySelector(".password-toggle");
  const passwordInput = document.getElementById("password");
  const passwordIcon = passwordToggle.querySelector("i");

  passwordToggle.addEventListener("click", () => {
    // Toggle the type attribute
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Toggle the icon
    passwordIcon.classList.toggle("fa-eye-slash");
    passwordIcon.classList.toggle("fa-eye");
  });

  // --- Clear Button ---
  const clearButton = document.querySelector(".clear-button");
  const searchInput = document.getElementById("search");

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus(); // Return focus to the input
  });

  // --- Character Counter ---
  const messageTextarea = document.getElementById("message");
  const charCountSpan = document.getElementById("char-count");

  messageTextarea.addEventListener("input", () => {
    const currentLength = messageTextarea.value.length;
    charCountSpan.textContent = currentLength;
  });

  // --- Real-time Email Validation ---
  const emailInput = document.getElementById("email");
  const emailGroup = document.getElementById("email-group");
  const emailHelperText = emailGroup.querySelector(".input-helper-text");

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value;

    // Reset classes
    emailGroup.classList.remove("success", "error");

    if (emailValue.length > 0) {
      if (validateEmail(emailValue)) {
        emailGroup.classList.add("success");
        emailHelperText.textContent = "Looks good!";
      } else {
        emailGroup.classList.add("error");
        emailHelperText.textContent = "Please enter a valid email address.";
      }
    } else {
      // Reset helper text if input is empty
      emailHelperText.textContent = "We'll never share your email.";
    }
  });
});
