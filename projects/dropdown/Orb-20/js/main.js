const selectMenu = document.querySelector(".select-menu");
const selectBtn = selectMenu.querySelector(".select-btn");
const options = selectMenu.querySelectorAll(".option");
const sBtn_text = selectMenu.querySelector(".sBtn-text");

// Toggle the dropdown menu
selectBtn.addEventListener("click", () => {
    selectMenu.classList.toggle("active");
});

// Select an option and update the button text
options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;

        // Close the menu after selection
        selectMenu.classList.remove("active");
    });
});

// Close the dropdown if clicked outside
document.addEventListener("click", (e) => {
    if (!selectMenu.contains(e.target)) {
        selectMenu.classList.remove("active");
    }
});