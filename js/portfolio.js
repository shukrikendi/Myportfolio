// Small helper to make the whole .portfolio-card clickable and keyboard accessible
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.portfolio-card[tabindex]').forEach(function (card) {
        card.addEventListener('click', function (e) {
            // if click on CTA anchor, let it handle the navigation
            if (e.target.closest('.portfolio-cta')) return;
            var href = card.getAttribute('data-href');
            if (href) window.location.href = href;
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                var href = card.getAttribute('data-href');
                if (href) window.location.href = href;
            }
        });
    });
});
