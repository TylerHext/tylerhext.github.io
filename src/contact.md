---
layout: base.njk
title: contact
mainClass: contact-page
---

<div class="contact-container">
  <div class="contact-box">
    <p>
      <span id="email-clickable" class="email-link">contact@tylerhext.com</span>
      <span id="copy-indicator" class="copy-indicator">✓ copied</span>
    </p>
  </div>
</div>

<style>
.email-link {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #f792ad;
  user-select: none;
}

.email-link:hover {
  text-shadow: 1px 0 #ff00ff, -1px 0 #00ffff;
}

.copy-indicator {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  color: #f792ad;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.copy-indicator.show {
  opacity: 1;
}
</style>

<script>
(function() {
  const emailElement = document.getElementById('email-clickable');
  const copyIndicator = document.getElementById('copy-indicator');
  const email = 'contact@tylerhext.com';

  emailElement.addEventListener('click', function() {
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(function() {
      // Show indicator
      copyIndicator.classList.add('show');

      // Hide after 1.5 seconds
      setTimeout(function() {
        copyIndicator.classList.remove('show');
      }, 1500);
    }).catch(function(err) {
      console.error('Failed to copy:', err);
    });
  });
})();
</script>
