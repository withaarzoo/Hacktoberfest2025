const checkboxes = [
  { id: "checkbox1", statusId: "status1" },
  { id: "checkbox2", statusId: "status2" },
  { id: "checkbox3", statusId: "status3" },
];

function updateSingleStatus(checkboxEl, statusEl) {
  if (checkboxEl.disabled) {
    statusEl.textContent = "Disabled";
    statusEl.style.color = "gray";
    return;
  }

  if (checkboxEl.checked) {
    statusEl.textContent = "Checked";
    statusEl.style.color = "green";
  } else {
    statusEl.textContent = "Unchecked";
    statusEl.style.color = "var(--primary-color)";
  }
}

function init() {
  checkboxes.forEach(({ id, statusId }) => {
    const cb = document.getElementById(id);
    const st = document.getElementById(statusId);
    if (!cb || !st) return;

    // initial state
    updateSingleStatus(cb, st);

    // update on change
    cb.addEventListener("change", () => updateSingleStatus(cb, st));
  });
}

document.addEventListener("DOMContentLoaded", init);
