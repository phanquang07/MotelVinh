<template>
  <div class="main-layout">
    <comp-header />
    <comp-filters @search="getSearch" />
    <nuxt />
    <slot :search="listSearch" />
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
      listSearch: [],
    };
  },
  methods: {
    getSearch(val) {
      this.listSearch = val;
      console.log("get list search --", this.listSearch);
    },
  },
};
</script>

<style>
</style>