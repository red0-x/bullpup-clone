(function () {
  var nodes = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (n) { n.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  nodes.forEach(function (n) { io.observe(n); });

  var ticker = document.querySelector(".ticker");
  var pause = document.querySelector(".ticker__pause");
  if (ticker && pause) {
    pause.addEventListener("click", function () {
      var paused = ticker.classList.toggle("is-paused");
      pause.setAttribute("aria-pressed", String(paused));
      pause.textContent = paused ? "Play" : "Pause";
    });
  }
})();
