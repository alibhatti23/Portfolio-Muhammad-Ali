---
title: "Contact"
description: "Get in touch with Muhammad Ali Sajid - Shopify Developer & Accountant"
keywords: [Contact, Muhammad Ali, Email, LinkedIn, GitHub]
lastmod: 2026-07-12
showtoc: false
searchHidden: true
ShowRssButtonInSectionTermList: false
ShowShareButtons: false
hideMeta: true
ShowBreadCrumbs: false
---

<style>
.post-title, .post-description, .share-buttons { display: none; }

.contact-wrapper {
  max-width: 560px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  text-align: center;
}

.contact-heading {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: var(--primary);
  letter-spacing: -0.02em;
}

.contact-subtext {
  font-size: 1rem;
  color: var(--primary);
  margin: 0 0 2rem;
  line-height: 1.7;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
}

/* CTA buttons row */
.contact-ctas {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: var(--background) !important;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none !important;
  transition: opacity 0.15s;
}
.contact-email:hover, .contact-email:visited, .contact-email:active { opacity: 0.85; color: var(--background) !important; text-decoration: none !important; }
.contact-email svg { width: 18px; height: 18px; }

.contact-wa {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  background: #25D366;
  color: #fff !important;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none !important;
  transition: opacity 0.15s;
}
.contact-wa:hover, .contact-wa:visited, .contact-wa:active { opacity: 0.88; color: #fff !important; text-decoration: none !important; }
.contact-wa svg { width: 18px; height: 18px; }

/* Form */
.contact-form-wrap {
  text-align: left;
  margin-bottom: 2rem;
}
.contact-form-wrap h2 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 1.25rem;
  text-align: center;
}

.cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.cf-field { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.75rem; }
.cf-field label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.cf-field input,
.cf-field select,
.cf-field textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  background: var(--entry);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--primary);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.cf-field input:focus,
.cf-field select:focus,
.cf-field textarea:focus { border-color: var(--accent); }
.cf-field textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
.cf-field select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 2rem; }

.cf-submit {
  width: 100%;
  padding: 0.8rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  margin-top: 0.5rem;
  font-family: inherit;
}
.cf-submit:hover { opacity: 0.88; }
.cf-submit:disabled { opacity: 0.55; cursor: not-allowed; }

.cf-success {
  display: none;
  padding: 1rem 1.25rem;
  background: rgba(34,197,94,0.1);
  border: 1px solid rgba(34,197,94,0.3);
  border-radius: 8px;
  color: var(--primary);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.75rem;
}
.cf-error {
  display: none;
  padding: 1rem 1.25rem;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 8px;
  color: var(--primary);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.75rem;
}

/* Divider */
.contact-divider {
  width: 48px;
  height: 1px;
  background: var(--border);
  margin: 2rem auto;
}

/* Social links */
.contact-socials {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--border) !important;
  border-bottom: 1px solid var(--border) !important;
  border-radius: 8px;
  color: var(--primary);
  text-decoration: none !important;
  box-shadow: none !important;
  transition: all 0.15s;
}
.social-link:hover, .social-link:focus {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--entry);
  box-shadow: none !important;
  outline: none !important;
}
.social-link svg { width: 20px; height: 20px; }

.contact-location {
  font-size: 0.85rem;
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.contact-location svg { width: 15px; height: 15px; }

@media (max-width: 480px) {
  .cf-row { grid-template-columns: 1fr; }
}
</style>

<div class="contact-wrapper">
  <h1 class="contact-heading">Let's talk</h1>
  <p class="contact-subtext">Have a project in mind or just want to say hello? I'd love to hear from you.</p>

  <div class="contact-ctas">
    <a href="mailto:m.alibhatti1465@gmail.com" class="contact-email">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      Email me
    </a>
    <a href="https://wa.me/923123626704" target="_blank" rel="noopener noreferrer" class="contact-wa">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      WhatsApp
    </a>
  </div>

  <div class="contact-form-wrap">
    <h2>Or send a message</h2>
    <form id="contactForm" action="https://formspree.io/f/xojgaooq" method="POST">
      <div class="cf-row">
        <div class="cf-field">
          <label for="cf-name">Name *</label>
          <input type="text" id="cf-name" name="name" placeholder="Your name" required autocomplete="name">
        </div>
        <div class="cf-field">
          <label for="cf-email">Email *</label>
          <input type="email" id="cf-email" name="email" placeholder="you@email.com" required autocomplete="email">
        </div>
      </div>
      <div class="cf-field">
        <label for="cf-subject">Subject</label>
        <select id="cf-subject" name="subject">
          <option value="">Select a topic…</option>
          <option value="Shopify Development">Shopify Development</option>
          <option value="Finance / Excel Tools">Finance / Excel Tools</option>
          <option value="Landing Page">Landing Page</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="cf-field">
        <label for="cf-message">Message *</label>
        <textarea id="cf-message" name="message" placeholder="Tell me about your project…" required></textarea>
      </div>
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
      <button type="submit" class="cf-submit" id="cf-btn">Send Message</button>
    </form>
    <div class="cf-success" id="cfSuccess">
      ✓ &nbsp;Message sent! I'll get back to you within 24 hours.
    </div>
    <div class="cf-error" id="cfError">
      Something went wrong. Please try emailing me directly at <a href="mailto:m.alibhatti1465@gmail.com">m.alibhatti1465@gmail.com</a>.
    </div>
  </div>

  <div class="contact-divider"></div>

  <div class="contact-socials">
    <a href="https://github.com/alibhatti23" class="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    </a>
    <a href="https://www.linkedin.com/in/muhammad-ali-sajid/" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    </a>
    <a href="https://instagram.com/ali.bhatti_ig" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 16.5 5zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6z"/>
      </svg>
    </a>
  </div>

  <div class="contact-location">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
    Multan, Pakistan
  </div>
</div>

<script>
(function() {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('cf-btn');
  const success = document.getElementById('cfSuccess');
  const error = document.getElementById('cfError');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;
    success.style.display = 'none';
    error.style.display = 'none';

    try {
      const res = await fetch('https://formspree.io/f/xojgaooq', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        throw new Error('non-ok');
      }
    } catch (_) {
      error.style.display = 'block';
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
})();
</script>
