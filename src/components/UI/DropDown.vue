<template>
  <div class="UI__dropdown">
    <div class="UI__dropdown__button"><span>Add object</span></div>
    <div class="UI__dropdown__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
}
</script>

<style lang="scss">
.UI__dropdown {
  position: relative;
  display: inline-block;
  color: white;
  padding: 12px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  &__content {
    display: none;
    position: absolute;
    background: var(--neutral-black);
    z-index: 1;
    left: 0;
    top: 100%;
    min-width: 150px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px rgb(90, 90, 90) solid;
  }

  &:hover {
    background: var(--neutral-n3);
    .UI__dropdown__content {
      display: block;
    }
  }
}
</style>
