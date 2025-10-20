// Small animator for skill circles
// - Reads data-percent on .skill-circle
// - Animates CSS custom property --p to degrees (percent * 3.6)
// - Animates the inner number from 0 to percent

(function () {
    'use strict';

    function animateCircle(el, duration) {
        var percent = parseInt(el.getAttribute('data-percent'), 10) || 0;
        var targetDeg = Math.round(percent * 3.6); // percent -> degrees
        var start = null;
        var initial = 0;
        var valueEl = el.querySelector('.skill-value');

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var currentDeg = Math.round(progress * targetDeg);
            el.style.setProperty('--p', currentDeg);
            var currentPercent = Math.round((currentDeg / 360) * 100);
            if (valueEl) valueEl.textContent = currentPercent + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // ensure final
                el.style.setProperty('--p', targetDeg);
                if (valueEl) valueEl.textContent = percent + '%';
            }
        }

        window.requestAnimationFrame(step);
    }

    function observeAndAnimate() {
        var els = document.querySelectorAll('.skill-circle');
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCircle(entry.target, 1000);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });

            els.forEach(function (el) { io.observe(el); });
        } else {
            // fallback: animate all after small timeout
            setTimeout(function () { els.forEach(function (el) { animateCircle(el, 1000); }); }, 300);
        }
    }

    // expose for manual trigger if needed
    window.skillsAnimator = { run: observeAndAnimate };

    document.addEventListener('DOMContentLoaded', observeAndAnimate);
})();
