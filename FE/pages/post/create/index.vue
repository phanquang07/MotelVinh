<template>
  <div class="post container">
    <div>
      <h1>Tạo bài viết</h1>
    </div>
    <div>
      <label for="">Nhập tiêu đề</label>
      <input
        type="text"
        class="form-control"
        placeholder="Nhập tiêu đề ..."
        v-model="title_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập loại phòng</label>
      <select
        v-model="category"
        @change="handleChangeCategory"
        class="form-control"
        name=""
        id=""
      >
        <option v-for="item in listCategory" :key="item._id" :value="item._id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập giá phòng</label>
      <input
        type="number"
        class="form-control"
        placeholder="Nhập giá phòng..."
        v-model="price_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập diện tích</label>
      <input
        type="number"
        class="form-control"
        placeholder="Nhập diện tích ..."
        v-model="area_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Chọn khu vực</label>
      <select v-model="district" class="form-control" name="" id="">
        <option v-for="item in listDistrict" :key="item._id" :value="item._id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <br />
    <!--  -->
    <!--  -->
    <div>
      <label for="">Nhập địa chỉ</label>
      <input
        type="text"
        class="form-control"
        placeholder="Nhập đại chỉ ..."
        v-model="address_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <br />
    <!--  -->
    <div>
      <label for="">Nhập số điện thoại</label>
      <input
        type="text"
        class="form-control"
        placeholder="Nhập số điện thoại ..."
        v-model="phone_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Mô tả</label>
      <textarea
        type="text"
        class="form-control"
        placeholder="Mô tả ..."
        v-model="description"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Tải lên hình ảnh</label>
      <input
        type="file"
        class="form-control"
        name="upload"
        multiple
        @change="handleGetImg($event)"
      />
    </div>
    <button @click="handleSave">Lưu lại</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title_post: "",
      type_post: 0,
      price_post: 0,
      vote_post: 4,
      area_post: 0,
      address_post: "",
      images_post: "",
      author_post: "",
      phone_post: "",
      description: "",
      listCategory: [],
      listDistrict: [],
      category: null,
      district: null,
      images: null,
    };
  },
  created() {
    if(!this.$store.state.isLogin) {
      this.$router.push("/")
    }
    this.fetchCategory();
    this.fetchDistrict();
  },
  methods: {
    changeInput() {
      // console.log("inputTitle", this.title_post);
      // console.log("inputType", this.type_post);
      // console.log("inputPrice", this.price_post);
    },
    handleChangeCategory() {
      console.log("category", this.category);
    },
    async fetchCategory() {
      let url = "http://localhost:3008/api/category/list";
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.listCategory = res.data.data;
            if (this.listCategory.length != 0) {
              this.category = this.listCategory[0]._id;
            }
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    async fetchDistrict() {
      let url = "http://localhost:3008/api/district/list";
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.listDistrict = res.data.data;
            if (this.listDistrict.length != 0) {
              this.district = this.listDistrict[0]._id;
            }
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    handleGetImg(event) {
      this.images = event.target.files;
      // if(event.t)
      // console.log(event.target.files)
    },
    async handleSave() {
      if (
        !this.title_post ||
        !this.price_post ||
        !this.category ||
        !this.district ||
        !this.phone_post ||
        !this.area_post ||
        !this.address_post ||
        !this.description
      )
        return;
      let data = new FormData();
      data.append("title", this.title_post);
      data.append("category", this.category);
      data.append("district", this.district);
      data.append("author", this.$store.state.id);
      data.append("price", this.price_post);
      data.append("area", this.area_post);
      data.append("address", this.address_post);
      data.append("phone", this.phone_post);
      data.append("descriptions", this.description);
      for (let i = 0; i < this.images.length ; i++ ) {
        data.append("images", this.images[i])
      }

      let url = "http://localhost:3008/api/motel/create";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios
        .post(url, data, config)
        .then((res) => {
          this.title_post = ""
          this.price_post = 0
          this.area_post = 0
          this.address_post = ""
          this.description = "";
          this.phone_post = ""
        })
        .catch((err) => {
          console.log(err);
        });

      // console.log("title", this.title_post);
      // const url = "http://localhost:3008";
      // await this.$axios
      //   .post(url + "/api/posts/create", {
      //     title: "đây là test",
      //     // type: this.type_post,
      //     // price: this.price_post,
      //     // vote: this.vote_post,
      //     // area: this.area_post,
      //     // address: this.address_post,
      //     // images: this.images_post,
      //     // author: this.author_post,
      //     // phone: this.phone_post,
      //     // description: this.description,
      //   })
      //   .then((res) => {
      //     console.log("data", res.data);
      //   });
    },
  },
};
</script>

<style>
</style>