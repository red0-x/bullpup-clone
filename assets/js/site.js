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

  var progress = document.querySelector(".scroll-progress i");
  var nav = document.querySelector(".nav");
  var bench = document.querySelector(".bench");
  var ticking = false;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onScroll() {
    var y = window.scrollY || 0;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.setProperty("--progress", max > 0 ? Math.min(y / max, 1) : 0);
    }
    if (nav) { nav.classList.toggle("is-scrolled", y > 8); }
    if (bench && !reduceMotion && window.innerWidth > 900) {
      bench.style.transform = "translate3d(0," + Math.min(y * 0.055, 42).toFixed(2) + "px,0)";
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

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
