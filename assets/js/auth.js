(function () {
  var tabLogin = document.getElementById("tab-login");
  var tabRegister = document.getElementById("tab-register");
  var title = document.getElementById("auth-title");
  var sub = document.getElementById("auth-sub");
  var submit = document.getElementById("auth-submit");
  var note = document.getElementById("auth-note");
  var form = document.getElementById("auth-form");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmField = document.getElementById("confirm-field");
  var confirmInput = document.getElementById("confirm-password");

  function showError(message, field) {
    note.hidden = false;
    note.setAttribute("role", "alert");
    note.setAttribute("aria-live", "assertive");
    note.textContent = message;
    if (field) {
      field.setAttribute("aria-invalid", "true");
      field.focus();
    }
  }

  function clearError(field) {
    field.removeAttribute("aria-invalid");
  }

  [email, password, confirmInput].forEach(function (field) {
    field.addEventListener("input", function () { clearError(field); });
  });

  function setMode(mode, push) {
    var register = mode === "register";
    tabLogin.setAttribute("aria-pressed", String(!register));
    tabRegister.setAttribute("aria-pressed", String(register));
    title.textContent = register ? "Create your bench" : "Welcome back";
    sub.textContent = register
      ? "Two backups per property. Free for 1 to 5 properties."
      : "Log in to see the bench for your properties.";
    submit.textContent = register ? "Create account" : "Log in";
    confirmField.hidden = !register;
    confirmInput.required = register;
    password.autocomplete = register ? "new-password" : "current-password";
    note.hidden = true;

    var url = new URL(window.location.href);
    if (register) { url.searchParams.set("mode", "register"); }
    else { url.searchParams.delete("mode"); }
    if (push) { history.replaceState(null, "", url); }
  }

  function currentMode() {
    return new URLSearchParams(window.location.search).get("mode") === "register"
      ? "register" : "login";
  }

  tabLogin.addEventListener("click", function () { setMode("login", true); });
  tabRegister.addEventListener("click", function () { setMode("register", true); });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearError(email);
    clearError(password);
    clearError(confirmInput);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError("Enter a valid email address.", email);
      return;
    }
    if (password.value.length < 8) {
      showError("Password must be at least 8 characters.", password);
      return;
    }
    if (currentMode() === "register" && password.value !== confirmInput.value) {
      showError("Passwords do not match.", confirmInput);
      return;
    }

    note.hidden = false;
    note.setAttribute("role", "status");
    note.setAttribute("aria-live", "polite");
    note.textContent = "This is a demo with no backend. No account was created and nothing was sent.";
  });

  setMode(currentMode(), false);
})();
