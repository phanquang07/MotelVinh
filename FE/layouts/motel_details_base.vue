<template>
  <div class="main-layout">
    <compHeader />
    <nuxt />
    <compFooter />
    <compBackTop />
  </div>
</template>

<script>
import compHeader from "@/components/header/compHeader.vue";
import compFooter from "@/components/footer/compFooter.vue";
export default {
  components: { compHeader, compFooter },
};
</script>

<style>
</style>