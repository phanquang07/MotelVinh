<template>
  <baseLayout>
    <comp-filters @search="getSearch" />
    <section class="motel-wrap">
      <a-row class="motel-base">
        <div class="grid wide">
          <a-col :lg="16" class="motel-left">
            <h2 class="motel-title mar-pad">Danh sách phòng trọ</h2>
            <a-row :gutter="[10, 10]" class="motel-left-list">
              <a-col
                :md="12"
                v-for="item in list"
                :key="item._id"
                class="motel-left-item"
              >
                <div class="motel-left-item-wrap">
                  <a-row :gutter="10">
                    <a-col :md="13" class="motel-item-thumbnails">
                      <nuxt-link
                        :to="`/motel_details/${item._id}`"
                        class="motel-item-thumbnails-link link"
                      >
                        <img
                          :src="item.images[0].name"
                          alt="Phòng trọ"
                          class="motel-item-thumbnails-inner block"
                        />
                      </nuxt-link>
                    </a-col>
                    <a-col :md="11" class="motel-item-text-wrap">
                      <div class="motel-item-text motel-item-title">
                        <nuxt-link
                          :to="`/motel_details/${item._id}`"
                          class="motel-item-title-link link"
                        >
                          {{ item.category ? item.category.name : "" }}
                        </nuxt-link>
                      </div>
                      <div class="motel-item-text motel-item-prices">
                        <i class="motel-icons-item fas fa-dollar-sign"></i
                        >{{ item.price }}
                      </div>
                      <div class="motel-item-text motel-item-stars">
                        <!-- <i :class="item.stars" class="stars-icon"></i>
                      <i :class="item.stars" class="stars-icon"></i>
                      <i :class="item.stars" class="stars-icon"></i>
                      <i :class="item.stars" class="stars-icon"></i> -->
                      </div>
                      <div class="motel-item-text motel-item-area">
                        <i class="motel-icons-item fas fa-chart-area"></i
                        >{{ item.area }}
                      </div>
                      <div class="motel-item-text motel-item-address">
                        <i class="motel-icons-item fas fa-map-marker-alt"></i>
                        {{ item.district ? item.district.name : "" }}
                      </div>
                      <div class="motel-item-text motel-item-createAt">
                        <i class="motel-icons-item fas fa-clock"></i
                        >{{ new Date(item.created_time).toLocaleString() }}
                      </div>
                    </a-col>
                  </a-row>
                </div>
              </a-col>
            </a-row>
            <div class="empty-data" v-if="list.length == 0">
              <span>Không có dữ liệu !</span>
            </div>
            <a-pagination
              :default-current="1"
              :total="200"
              v-if="list.length > 10"
            />
          </a-col>
          <a-col :lg="8" class="motel-right">
            <div class="motel-right-item motel-filter-wrap">
              <div class="motel-filter-inner">
                <h2
                  class="motel-right-item-title motel-filter-item-title mar-pad"
                >
                  Xem theo địa điểm:
                </h2>
                <a-row class="motel-filter-item-wrap">
                  <a-col
                    :xs="12"
                    class="motel-filter-item-inner-left"
                    v-for="item in listDistrict"
                    :key="item._id"
                  >
                    <a
                      href="#"
                      class="motel-filter-item block"
                      @click="getFilter(item._id, 'district')"
                    >
                      <i class="fas fa-angle-right"></i>
                      {{ item.name }}
                    </a>
                  </a-col>
                </a-row>
              </div>
              <!--  -->
              <div class="motel-filter-inner">
                <h2
                  class="motel-right-item-title motel-filter-item-title mar-pad"
                >
                  Xem theo kiểu phòng:
                </h2>
                <a-row class="motel-filter-item-wrap">
                  <a-col
                    :xs="12"
                    class="motel-filter-item-inner-left"
                    v-for="item in listType"
                    :key="item._id"
                  >
                    <a
                      href="#"
                      class="motel-filter-item block"
                      @click="getFilter(item._id, 'type')"
                    >
                      <i class="fas fa-angle-right"></i>
                      {{ item.name }}
                    </a>
                  </a-col>
                </a-row>
              </div>
              <!--  -->
              <div class="motel-filter-inner">
                <h2
                  class="motel-right-item-title motel-filter-item-title mar-pad"
                >
                  Xem theo giá phòng:
                </h2>
                <a-row class="motel-filter-item-wrap">
                  <a-col
                    :xs="12"
                    class="motel-filter-item-inner-left"
                    v-for="item in listPrice"
                    :key="item._id"
                  >
                    <a
                      href="#"
                      class="motel-filter-item block"
                      @click="getFilter(item._id, 'price')"
                    >
                      <i class="fas fa-angle-right"></i>
                      {{ item.name }}
                    </a>
                  </a-col>
                </a-row>
              </div>
              <!--  -->
              <div class="motel-filter-inner">
                <h2
                  class="motel-right-item-title motel-filter-item-title mar-pad"
                >
                  Xem theo diện tích:
                </h2>
                <a-row class="motel-filter-item-wrap">
                  <a-col
                    :xs="12"
                    class="motel-filter-item-inner-left"
                    v-for="item in listArea"
                    :key="item._id"
                  >
                    <a
                      href="#"
                      class="motel-filter-item block"
                      @click="getFilter(item._id, 'area')"
                    >
                      <i class="fas fa-angle-right"></i>
                      {{ item.name }}
                    </a>
                  </a-col>
                </a-row>
              </div>
              <!--  -->
            </div>
            <div class="motel-right-item motel-item-news">
              <h2 class="motel-right-item-title motel-item-news-title mar-pad">
                Phòng trọ mới đăng
              </h2>
            </div>
            <div class="motel-right-item motel-item-recents">
              <h2
                class="motel-right-item-title motel-item-recents-title mar-pad"
              >
                Phòng trọ vừa xem
              </h2>
            </div>
          </a-col>
        </div>
      </a-row>
    </section>
  </baseLayout>
</template>

<script>
import baseLayout from "~/layouts/motel_base.vue";
import CompFilters from "@/components/filters/compFilters.vue";
export default {
  // layout: "motel_base",
  components: { baseLayout, CompFilters },
  data() {
    return {
      list: [],
      listSearch: [],
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
    this.fetch();
    this.fetchDistrict();
    this.fetchCategory();
  },
  methods: {
    getSearch(val) {
      this.list = val;
    },
    fetch() {
      let url = "http://localhost:3008/api/motel/list";
      this.$axios
        .post(url, {})
        .then((res) => {
          if (res.data.success) {
            this.list = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
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
    getFilter(val, type) {
      if (type === "district") {
        this.optionSearch.district = val;
      }
      if (type === "type") {
        this.optionSearch.type = val;
      }
      if (type === "price") {
        this.optionSearch.price = val;
      }
      if (type === "area") {
        this.optionSearch.area = val;
      }
      let url = "http://localhost:3008/api/motel/search";
      this.$axios
        .post(url, { data: this.optionSearch })
        .then((res) => {
          if (res.data.success) {
            this.list = res.data.data;
          } else {
            console.log("get error ---", res.data.message);
            this.list = [];
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.motel-base {
  padding-top: 4rem;
  .motel-left {
    padding-left: 0;
    padding-right: 1rem;
    .motel-title {
      margin-bottom: 1.6rem;
    }
    .motel-left-list {
      .motel-left-item {
        .motel-left-item-wrap {
          border-radius: 0.5rem;
          overflow: hidden;
          background: $white-color;
          // border: 0.1rem solid $border-color;
          &:hover {
            box-shadow: 0 0.2rem 0.4rem 0 rgb(0 0 0 / 35%);
          }
          .motel-item-thumbnails {
            // padding-right: 1rem;
            .motel-item-thumbnails-inner {
              width: 100%;
            }
          }
          .motel-item-text-wrap {
            padding: 1rem;
            .motel-item-text {
              font-weight: 500;
            }
            .motel-item-title {
              font-size: 1.6rem;
              font-weight: 700;
              padding-bottom: 0.3rem;
              white-space: nowrap;
              .motel-item-title-link {
                color: $hover-color;
              }
            }
            .motel-item-prices {
              font-weight: 700;
              color: $price-color;
            }
            // .motel-item-area {
            // }
            .motel-item-stars {
              font-size: 2rem;
              color: $filter-color;
              display: flex;
              align-items: center;
              .stars-icon {
                font-size: 1.4rem;
              }
            }
            // .motel-item-address {
            // }
            // .motel-item-author {
            // }
            // .motel-item-createAt {
            // }
          }
        }
      }
    }
  }
  .motel-right {
    padding-top: 3.6rem;
    padding-left: 1rem;
    padding-right: 0;
    .motel-right-item {
      padding: 2rem;
      border-radius: 0.5rem;
      background: $white-color;
      box-shadow: 0 0.2rem 0.4rem 0 rgb(0 0 0 / 35%);
      margin-bottom: 2rem;
    }
    .motel-filter-wrap {
      .motel-filter-inner {
        margin-bottom: 2rem;
        // .motel-filter-item-title {
        // }
        .motel-filter-item-wrap {
          // .motel-filter-item-inner-left {
          // }
          .motel-filter-item {
            color: $text-color;
            &:hover {
              color: $hover-color;
            }
          }
        }
      }
    }
    // .motel-item-news {
    // }
    // .motel-item-recents {
    // }
  }
  .motel-right-item-title {
    margin-bottom: 2rem;
  }
  .motel-icons-item {
    margin-right: 0.6rem;
  }
}
.empty-data {
  margin: 10px 0;
}
</style>