<template>
  <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.65216 21.8696C16 28.1305 25.3913 24.6522 27.8261 15.9565" :stroke="color" stroke-width="0.869565" />
    <path d="M24.3478 4.18864C16 -2.07223 6.60871 1.40603 4.17393 10.1017" :stroke="color" stroke-width="0.869565" />
    <path d="M1.39292e-05 11.7826L8.34784 11.7826L4.17393 18.3913L1.39292e-05 11.7826Z" :fill="color" />
    <path d="M32 14.5652L23.6522 14.5652L27.8261 7.95654L32 14.5652Z" :fill="color" />
    <path d="M16 7.95654L21.2174 13.1739L16 18.3913L10.7826 13.1739L16 7.95654Z" :fill="color" />
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
