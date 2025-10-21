// Experience timeline animations
// - Adds 'in-view' class to .timeline-item when scrolled into view
// - Adds subtle hover effect to icons

(function () {
    'use strict';

    function initTimeline() {
        var items = document.querySelectorAll('#experience .timeline-item');
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            items.forEach(function (it) { io.observe(it); });
        } else {
            // fallback
            items.forEach(function (it) { it.classList.add('in-view'); });
        }

        // add hover for icons (desktop)
        items.forEach(function (it) {
            var icon = it.querySelector('.icon');
            if (!icon) return;
            it.addEventListener('mouseenter', function () { icon.classList.add('hover'); });
            it.addEventListener('mouseleave', function () { icon.classList.remove('hover'); });
        });
    }

    document.addEventListener('DOMContentLoaded', initTimeline);
})();
