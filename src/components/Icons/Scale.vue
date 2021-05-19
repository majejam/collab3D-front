<template>
  <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5909 5.0303L21.0758 11.0909L19.5606 9.57576L15.7727 13.3636L14.2576 11.8485L18.0454 8.06061L16.5303 6.54546L22.5909 5.0303Z" :fill="color" />
    <rect x="1" y="13.3636" width="12.8788" height="12.8788" :fill="color" />
    <path d="M16.5303 25.4848H26V2H1.75757L1.75757 11.4697" :stroke="color" stroke-width="2.27273" />
  </svg>
</template>

<script>
export default {
  name: 'Scale',
  props: {
    color: {
      type: String,
      default: '#FFFFFF',
    },
  },
}
</script>
