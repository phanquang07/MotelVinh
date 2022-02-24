<template>
  <div class="main-layout">
    <comp-header />
    <comp-filters />
    <nuxt/>
    <comp-footer />
    <comp-back-top />
  </div>
</template>

<script>
import compHeader from "@/components/header/compHeader.vue";
import compFooter from "@/components/footer/compFooter.vue";
import CompFilters from "@/components/filters/compFilters.vue";
import CompBackTop from "@/components/back_top/compBackTop.vue";
// import searchData from "@/api/searchList.json";

export default {
  components: { compHeader, compFooter, CompFilters, CompBackTop },
  data() {
    return {
      // searchList: searchData.searchList,
    };
  },
};
</script>

<style>
</style>