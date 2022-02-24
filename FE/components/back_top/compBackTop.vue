<template>
  <a-back-top class="back-top-wrap">
    <div class="ant-back-top-inner">
      <a-icon type="arrow-up" />
    </div>
  </a-back-top>
</template>

<script>
export default {
  layout: "motel_base",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.back-top-wrap {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 5rem;
  height: 5rem;
  font-size: 2.5rem;
  color: $text2-color;
  background: $hover-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>