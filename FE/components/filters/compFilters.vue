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
              v-model="district"
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
              v-model="type"
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
              v-model="price"
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
              v-model="area"
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
  props: {
    cleanData: Boolean,
  },
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
      district: 0,
      type: 0,
      price: 0,
      area: 0,
    };
  },
  watch: {
    cleanData() {
      this.district = 0;
      this.type = 0;
      this.price = 0;
      this.area = 0;
      this.optionSearch = {};
    },
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
      if (val == 1) {
        this.optionSearch.priceFrom = 0;
        this.optionSearch.priceTo = 1000000;
      }
      if (val == 2) {
        this.optionSearch.priceFrom = 1000000;
        this.optionSearch.priceTo = 1500000;
      }
      if (val == 3) {
        this.optionSearch.priceFrom = 1500000;
        this.optionSearch.priceTo = 2000000;
      }
      if (val == 4) {
        this.optionSearch.priceFrom = 2000000;
        this.optionSearch.priceTo = 1000000000;
      }
    },
    choseArea(val) {
      if (val == 1) {
        this.optionSearch.areaFrom = 0;
        this.optionSearch.areaTo = 10;
      }
      if (val == 2) {
        this.optionSearch.areaFrom = 10;
        this.optionSearch.areaTo = 15;
      }
      if (val == 3) {
        this.optionSearch.areaFrom = 15;
        this.optionSearch.areaTo = 20;
      }
      if (val == 4) {
        this.optionSearch.areaFrom = 20;
        this.optionSearch.areaTo = 1000;
      }
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
      let data = {
        filter: {},
      };
      data.filter.district = this.optionSearch.district;
      data.filter.category = this.optionSearch.type;
      data.filter.priceFrom = this.optionSearch.priceFrom;
      data.filter.priceTo = this.optionSearch.priceTo;
      data.filter.areaFrom = this.optionSearch.areaFrom;
      data.filter.areaTo = this.optionSearch.areaTo;
      let url = "http://localhost:3008/api/motel/list";
      this.$axios
        .post(url, { data: data })
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