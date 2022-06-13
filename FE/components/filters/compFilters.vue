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
          <a-col :lg="5" :md="12" :sm="24" :xs="24" class="search-filter-item">
            <a-select
              :default-value="0"
              style="width: 100%"
              @change="choseDistrict"
            >
              <a-select-option
                :value="0"
                disabled
                class="search-filter-select-item"
              >
                -- Địa điểm --
              </a-select-option>
              <a-select-option
                v-for="(item, idx) in listDistrict"
                :key="idx"
                :value="item._id"
                class="search-filter-select-item"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :lg="5" :md="12" :sm="24" :xs="24" class="search-filter-item">
            <a-select
              :default-value="0"
              style="width: 100%"
              @change="choseType"
            >
              <a-select-option
                :value="0"
                disabled
                class="search-filter-select-item"
              >
                -- Kiểu phòng --
              </a-select-option>
              <a-select-option
                v-for="(item, idx) in listType"
                :key="idx"
                :value="item._id"
                class="search-filter-select-item"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :lg="5" :md="12" :sm="24" :xs="24" class="search-filter-item">
            <a-select
              :default-value="0"
              style="width: 100%"
              @change="chosePrice"
            >
              <a-select-option
                :value="0"
                disabled
                class="search-filter-select-item"
              >
                -- Giá phòng --
              </a-select-option>
              <a-select-option
                v-for="item in listPrice"
                :key="item.id"
                :value="item.id"
                class="search-filter-select-item"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :lg="5" :md="12" :sm="24" :xs="24" class="search-filter-item">
            <a-select
              :default-value="0"
              style="width: 100%"
              @change="choseArea"
            >
              <a-select-option
                :value="0"
                disabled
                class="search-filter-select-item"
              >
                -- Diện tích --
              </a-select-option>
              <a-select-option
                v-for="item in listArea"
                :key="item.id"
                :value="item.id"
                class="search-filter-select-item"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :lg="{ span: 4, offset: 0 }" class="search-filter-item">
            <a-button
              html-type="submit"
              icon="search"
              class="search-filter-btn"
              @click="search"
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
      listDistrict: [],
      listType: [],
      listPrice: [
        {
          id: 1,
          name: "Dưới 1 triệu",
        },
        {
          id: 2,
          name: "1tr - 1tr5",
        },
        {
          id: 3,
          name: "1tr5 - 2tr",
        },
        {
          id: 4,
          name: "Trên 2tr",
        },
      ],
      listArea: [
        {
          id: 1,
          name: "Dưới 10m2",
        },
        {
          id: 2,
          name: "10 - 15m2",
        },
        {
          id: 3,
          name: "15 - 20m2",
        },
        {
          id: 4,
          name: "Trên 20m2",
        },
      ],
      optionSearch: {},
    };
  },
  created() {
    this.fetchDistrict();
    this.fetchCategory();
  },
  methods: {
    choseDistrict(val) {
      this.optionSearch.district = val;
    },
    choseType(val) {
      this.optionSearch.type = val;
    },
    chosePrice(val) {
      this.optionSearch.price = val;
    },
    choseArea(val) {
      this.optionSearch.area = val;
    },
    fetchDistrict() {
      let url = "http://localhost:3008/api/district/list";
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.listDistrict = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchCategory() {
      let url = "http://localhost:3008/api/category/list";
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.listType = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    search() {
      if (
        !this.optionSearch.district &&
        !this.optionSearch.type &&
        !this.optionSearch.price &&
        !this.optionSearch.area
      ) {
        return false;
      }
      let url = "http://localhost:3008/api/motel/search";
      this.$axios
        .post(url, { data: this.optionSearch })
        .then((res) => {
          if (res.data.success) {
            this.$emit("search", res.data.data);
          } else {
            console.log("get error ---", res.data.message);
            this.$emit("search", []);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
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