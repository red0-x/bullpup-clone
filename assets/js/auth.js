(function () {
  var tabLogin = document.getElementById("tab-login");
  var tabRegister = document.getElementById("tab-register");
  var title = document.getElementById("auth-title");
  var sub = document.getElementById("auth-sub");
  var submit = document.getElementById("auth-submit");
  var note = document.getElementById("auth-note");
  var form = document.getElementById("auth-form");
  var password = document.getElementById("password");
  var confirmField = document.getElementById("confirm-field");
  var confirmInput = document.getElementById("confirm-password");

  function setMode(mode, push) {
    var register = mode === "register";
    tabLogin.setAttribute("aria-pressed", String(!register));
    tabRegister.setAttribute("aria-pressed", String(register));
    title.textContent = register ? "Create your bench" : "Welcome back";
    sub.textContent = register
      ? "Two backups per property. Free for 1 to 5 rentals."
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
    if (currentMode() === "register" && password.value !== confirmInput.value) {
      note.hidden = false;
      note.textContent = "Passwords do not match.";
      return;
    }
    note.hidden = false;
    note.textContent = "This is a static clone with no backend. No account was created and nothing was sent.";
  });

  setMode(currentMode(), false);
})();
