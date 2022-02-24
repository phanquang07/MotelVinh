<template>
  <section class="search-wrap">
    <div class="search-inner">
      <a-row
        :gutter="[10, 10]"
        type="flex"
        justify="center"
        class="search-filter"
      >
        <div class="grid wide">
          <a-col
            :lg="5"
            :md="12"
            :sm="24"
            :xs="24"
            v-for="item in searchList"
            :key="item.id"
            class="search-filter-item"
          >
            <a-select
              :default-value="item.subname1"
              style="width: 100%"
              @change="handleChange"
            >
              <a-select-option
                :value="item.subname1"
                disabled
                class="search-filter-select-item"
              >
                {{ item.subname1 }}
              </a-select-option>
              <a-select-option
                :value="item.subname2"
                class="search-filter-select-item"
              >
                {{ item.subname2 }}
              </a-select-option>
              <a-select-option
                :value="item.subname3"
                class="search-filter-select-item"
              >
                {{ item.subname3 }}
              </a-select-option>
              <a-select-option
                :value="item.subname4"
                class="search-filter-select-item"
              >
                {{ item.subname4 }}
              </a-select-option>
              <a-select-option
                :value="item.subname5"
                v-if="item.values === 1"
                class="search-filter-select-item"
              >
                {{ item.subname5 }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col
            :lg="{ span: 4, offset: 0 }"
            class="search-filter-item"
          >
            <a-button
              html-type="submit"
              icon="search"
              class="search-filter-btn"
            >
              Tìm kiếm
            </a-button>
          </a-col>
        </div>
      </a-row>
    </div>
  </section>
</template>

<script>
import searchData from "~/api/searchList.json";
export default {
  data() {
    return {
      searchList: searchData.searchList,
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>

<style lang="scss">
.search-wrap {
  padding-top: 1rem;
  .search-inner {
    padding-top: 0.6rem;
    display: flex;
    justify-content: center;
    .search-filter {
      max-width: 100rem;
      width: 100%;
      padding: 0.5rem;
      background: $filter-color;
      border-radius: 0.8rem;
      .search-filter-item {
        .search-filter-select-item {
            color: $border-color;
        }
        .search-filter-btn {
          height: 3.8rem;
          width: 100%;
          background: $main-color;
          color: $text2-color;
          border: none;
        }
      }
    }
  }
  .ant-select-selection--single {
    height: 38px !important;
  }
  .ant-select-selection__rendered {
    line-height: 36px;
  }
}
</style>