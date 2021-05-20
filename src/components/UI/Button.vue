<template>
  <button class="UI__Button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
}
</script>

<style lang="scss">
.UI__Button {
  padding: 8px 16px;

  width: 100%;
  cursor: pointer;

  color: var(--neutral-white);

  &:hover {
    background: #fe505a;
  }
}
</style>
