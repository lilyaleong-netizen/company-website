<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <img
              src="/logo.png"
              alt="[COMPANY_NAME]"
              class="footer-logo"
            />
            <p class="footer-desc">
              [FOOTER_DESC_LINE_1] — Replace with your company
              footer description.
            </p>
            <div class="footer-social">
              <a href="[LINKEDIN_URL]" aria-label="LinkedIn" class="social-icon" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:[CONTACT_EMAIL]" aria-label="Email" class="social-icon" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-col">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li v-for="item in navItems" :key="item.path">
                <RouterLink :to="item.path">{{ item.label }}</RouterLink>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-col">
            <h4 class="footer-heading">Services</h4>
            <ul class="footer-links">
              <li><RouterLink to="/services">[SERVICE_1_TITLE]</RouterLink></li>
              <li><RouterLink to="/services">[SERVICE_2_TITLE]</RouterLink></li>
              <li><RouterLink to="/services">[SERVICE_3_TITLE]</RouterLink></li>
              
              
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-col">
            <h4 class="footer-heading">Contact Us</h4>
            <ul class="footer-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <span>[PHONE_NUMBER]</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span>[CONTACT_EMAIL]</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>[COMPANY_ADDRESS]</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>© [YEAR] [COMPANY_NAME]. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/services', label: 'Services' },
  { path: '/capability', label: 'Capability' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.footer {
  background: $bg-dark;
  color: rgba(255,255,255,0.8);

  &-top {
    padding: 64px 0 40px;
  }

  &-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 40px;

    @include tablet {
      grid-template-columns: 1fr 1fr;
    }
    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  &-logo {
    height: 48px;
    width: auto;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 6px;
    padding: 6px 12px;
    display: block;
  }

  &-desc {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255,255,255,0.6);
    margin-bottom: 20px;
  }

  &-social {
    display: flex;
    gap: 12px;
  }

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    color: $white;
    transition: all var(--transition);

    svg { width: 18px; height: 18px; }

    &:hover {
      background: $primary-color;
      transform: translateY(-3px);
    }
  }

  &-heading {
    font-size: 15px;
    font-weight: 700;
    color: $white;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid $primary-color;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &-links {
    display: flex;
    flex-direction: column;
    gap: 10px;

    li a {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      transition: all var(--transition);
      display: flex;
      align-items: center;
      gap: 6px;

      &::before {
        content: '›';
        color: $primary-color;
        font-size: 16px;
      }

      &:hover {
        color: $white;
        padding-left: 4px;
      }
    }
  }

  &-contact {
    display: flex;
    flex-direction: column;
    gap: 14px;

    li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 14px;
      color: rgba(255,255,255,0.6);

      svg {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        color: $primary-color;
        margin-top: 2px;
      }
    }
  }

  &-bottom {
    border-top: 1px solid rgba(255,255,255,0.1);
    padding: 20px 0;
    text-align: center;

    p {
      font-size: 14px;
      color: rgba(255,255,255,0.4);
    }
  }
}
</style>
