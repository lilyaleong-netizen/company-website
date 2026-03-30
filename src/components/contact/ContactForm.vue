<template>
  <div class="contact-form-wrap">
    <p class="section-label">Send a Message</p>
    <h2 class="section-title">Get In <span>Touch</span></h2>
    <div class="divider"></div>

    <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
      <div class="form-row">
        <div class="form-group" :class="{ error: errors.name }">
          <label for="cf-name">Your Name <span class="required">*</span></label>
          <input
            id="cf-name"
            v-model="form.name"
            type="text"
            placeholder="Enter your full name"
            @blur="validateField('name')"
          />
          <span class="error-msg" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="form-group" :class="{ error: errors.email }">
          <label for="cf-email">Your Email <span class="required">*</span></label>
          <input
            id="cf-email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email address"
            @blur="validateField('email')"
          />
          <span class="error-msg" v-if="errors.email">{{ errors.email }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="cf-subject">Subject</label>
        <input
          id="cf-subject"
          v-model="form.subject"
          type="text"
          placeholder="What is this about?"
        />
      </div>

      <div class="form-group" :class="{ error: errors.message }">
        <label for="cf-message">Your Message <span class="required">*</span></label>
        <textarea
          id="cf-message"
          v-model="form.message"
          rows="6"
          placeholder="Tell us about your requirements..."
          @blur="validateField('message')"
        ></textarea>
        <span class="error-msg" v-if="errors.message">{{ errors.message }}</span>
      </div>

      <button type="submit" class="btn btn-primary submit-btn" :disabled="submitting || cooldown > 0">
        <svg v-if="!submitting && cooldown === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
        </svg>
        <span v-if="submitting">Sending...</span>
        <span v-else-if="cooldown > 0">Retry in {{ cooldown }}s</span>
        <span v-else>Send Message</span>
      </button>
    </form>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast" :class="`toast-${toast.type}`">
        <span class="toast-icon">{{ toast.type === 'success' ? '✅' : '❌' }}</span>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const RATE_LIMIT_MS = 30000

const form = reactive({ name: '', email: '', subject: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const submitting = ref(false)
const cooldown = ref(0)
const toast = reactive({ show: false, type: 'success', message: '' })

let cooldownTimer = null
let toastTimer = null

onUnmounted(() => {
  clearInterval(cooldownTimer)
  clearTimeout(toastTimer)
})

const validateField = (field) => {
  errors[field] = ''
  if (field === 'name' && !form.name.trim()) {
    errors.name = 'Name is required'
  }
  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address'
    }
  }
  if (field === 'message' && !form.message.trim()) {
    errors.message = 'Message is required'
  }
}

const startCooldown = () => {
  cooldown.value = RATE_LIMIT_MS / 1000
  cooldownTimer = setInterval(() => {
    cooldown.value -= 1
    if (cooldown.value <= 0) {
      clearInterval(cooldownTimer)
      cooldown.value = 0
    }
  }, 1000)
}

const showToast = (type, message) => {
  toast.show = true
  toast.type = type
  toast.message = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.show = false }, 4000)
}

const handleSubmit = async () => {
  if (cooldown.value > 0) return

  validateField('name')
  validateField('email')
  validateField('message')
  if (errors.name || errors.email || errors.message) return

  submitting.value = true
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name:  form.name,
        email: form.email,
        subject:    form.subject || '(No Subject)',
        message:    form.message,
      },
      PUBLIC_KEY,
    )
    form.name = form.email = form.subject = form.message = ''
    startCooldown()
    showToast('success', "Message sent! We'll respond within 24 hours.")
  } catch {
    showToast('error', 'Failed to send. Please email us directly at [CONTACT_EMAIL]')
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @include mobile { grid-template-columns: 1fr; }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: $text-dark;
  }

  .required { color: #e53e3e; }

  input, textarea {
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    font-size: 15px;
    font-family: inherit;
    color: $text-dark;
    transition: border-color var(--transition);
    background: $white;
    resize: vertical;

    &::placeholder { color: #aaa; }
    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
  }

  &.error input,
  &.error textarea { border-color: #e53e3e; }
}

.error-msg {
  font-size: 13px;
  color: #e53e3e;
  display: flex;
  align-items: center;
  gap: 4px;
}

.submit-btn {
  padding: 14px 32px;
  font-size: 16px;
  align-self: flex-start;
  gap: 10px;

  svg { width: 18px; height: 18px; }
  &:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }
}

// Toast
.toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  padding: 16px 24px;
  border-radius: var(--radius);
  color: $white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-lg);
  max-width: 400px;

  &-success { background: $secondary-color; }
  &-error   { background: #e53e3e; }

  .toast-icon { font-size: 20px; }

  @include mobile {
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
}

.toast-enter-active, .toast-leave-active { transition: all 0.35s ease; }
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
