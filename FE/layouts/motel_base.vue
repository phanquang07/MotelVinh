<template>
  <div class="main-layout">
    <comp-header />
    <nuxt />
    <slot />
    <comp-footer />
    <comp-back-top />
  </div>
</template>

<script>
import compHeader from "@/components/header/compHeader.vue";
import compFooter from "@/components/footer/compFooter.vue";
import CompBackTop from "@/components/back_top/compBackTop.vue";
// import searchData from "@/api/searchList.json";

export default {
  components: { compHeader, compFooter, CompBackTop },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>