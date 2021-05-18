<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.1304 4.69565H8.86957L12 0L15.1304 4.69565Z" :fill="color" />
    <path d="M8.86956 19.3043L15.1304 19.3043L12 24L8.86956 19.3043Z" :fill="color" />
    <path d="M4.69565 8.86956L4.69565 15.1304L-1.36836e-07 12L4.69565 8.86956Z" :fill="color" />
    <path d="M19.3043 15.1304L19.3043 8.86957L24 12L19.3043 15.1304Z" :fill="color" />
    <rect x="10.9565" y="15.1304" width="2.08696" height="3.65217" :fill="color" />
    <rect x="10.9565" y="5.21738" width="2.08696" height="3.65217" :fill="color" />
    <rect x="18.7826" y="10.9565" width="2.08696" height="3.65217" transform="rotate(90 18.7826 10.9565)" :fill="color" />
    <rect x="8.86957" y="10.9565" width="2.08696" height="3.65217" transform="rotate(90 8.86957 10.9565)" :fill="color" />
  </svg>
</template>

<script>
export default {
  name: 'Move',
  props: {
    color: {
      type: String,
      default: '#FFFFFF',
    },
  },
}
</script>
