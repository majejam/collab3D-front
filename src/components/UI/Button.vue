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
  background: grey;
  border: 1px rgb(90, 90, 90) solid;
  border-radius: 4px;

  width: fit-content;

  color: var(--neutral-white);
}
</style>
