<template>
  <div class="details-motel">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>Trang chủ</a-breadcrumb-item>
        <a-breadcrumb-item>Chi tiết phòng trọ</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div v-if="post">
      <a-carousel arrows dots-class="slick-dots slick-thumb">
        <a slot="customPaging" slot-scope="props">
          <img
            style="max-width: 100%; max-hegight: 300px"
            :src="getImgUrl(props.i)"
          />
        </a>
        <div v-for="item in post.images" :key="item._id">
          <img :src="item.name" />
        </div>
      </a-carousel>
      <div class="content-detail">
        <h1>{{ post.title }}</h1>
        <p><strong>Loại: </strong> {{ post.category.name }}</p>
        <p><strong>Khu vực: </strong> {{ post.district.name }}</p>
        <p><strong>Địa chỉ: </strong> {{ post.address }}</p>
        <p><strong>Người tạo: </strong> {{ post.author.name }}</p>
        <p><strong>Giá: </strong> {{ post.price }} đ</p>
        <p><strong>Diện tích: </strong> {{ post.area }} m2</p>
        <h5><strong>Mô tả</strong></h5>
        <p>{{ post.descriptions }}</p>
      </div>

      <!-- {{ post }} -->
    </div>
  </div>
</template>

<script>
export default {
  layout: "motel_details_base",
  data() {
    return {
      post: null,
    };
  },
  created() {
    // console.log(this.$route.params.id);
    this.fetch();
  },
  methods: {
    fetch() {
      let url = "http://localhost:3008/api/motel/get/" + this.$route.params.id;
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.post = res.data.data;
            console.log("post", post);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getImgUrl(i) {
      console.log(this.post.images[i]);
      return this.post.images[i].name;
    },
  },
};
</script>

<style scoped>
.ant-carousel >>> .slick-dots {
  height: auto;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
  max-height: 300px;
}
.ant-carousel >>> .slick-thumb {
  bottom: -45px;
}
.ant-carousel >>> .slick-thumb li {
  width: 60px;
  height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
.content-detail {
  max-width: 1170px;
  margin: 50px auto 0 auto;
  width: 1170px;
}
</style>