<template>
  <div class="post container">
    <div>
      <h1>Tạo bài viết</h1>
    </div>
    <div>
      <label for=""
        >Nhập tiêu đề <span style="color: red; margin-left: 5px">*</span></label
      >
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
      <label for="">
        Nhập loại phòng
        <span style="color: red; margin-left: 5px">*</span>
      </label>
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
      <label for="">
        Nhập giá phòng
        <span style="color: red; margin-left: 5px">*</span>
      </label>
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
      <label for=""
        >Nhập diện tích
        <span style="color: red; margin-left: 5px">*</span>
      </label>
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
      <label for="">
        Chọn khu vực
        <span style="color: red; margin-left: 5px">*</span>
      </label>
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
      <label for="">
        Nhập địa chỉ
        <span style="color: red; margin-left: 5px">*</span>
      </label>
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
      <label for=""
        >Nhập số điện thoại
        <span style="color: red; margin-left: 5px">*</span>
      </label>
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
    <div class="action-create">
      <button class="btn-back" @click="back">Trở lại</button>
      <button class="btn-create" @click="handleSave">Lưu lại</button>
    </div>
    <notifications position="top right" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title_post: "",
      type_post: "",
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
    if (!this.$store.state.isLogin) {
      this.$router.push("/");
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
    back() {
      this.$router.push({
        path: "/",
      });
    },
    beforSave() {
      if (
        this.title_post == "" ||
        this.category == "" ||
        this.price_post == 0 ||
        this.area_post == 0 ||
        this.district == "" ||
        this.address_post == "" ||
        this.phone_post == ""
      ) {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Không được bỏ trống các trường có dấu (*) !",
        });
        return false;
      }
      return true;
    },
    handleSave() {
      let check = this.beforSave();
      console.log("get action create ---", check);
      if (!check) return;
      let data = {
        title: this.title_post,
        category: this.category,
        description: this.description,
        district: this.district,
        address: this.address_post,
        phone: this.phone_post,
        area: Number(this.area_post),
        price: Number(this.price_post),
        images: this.images,
      };
      let url = "http://localhost:3008/api/motel/create";
      // let config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };
      this.$axios
        .post(url, data)
        .then((res) => {
          console.log("get res ----", res);
          if (res) {
            this.$notify({
              type: "success",
              title: "Thành công !",
              text: "Đăng tin thành công !",
            });
            this.title_post = "";
            this.price_post = 0;
            this.area_post = 0;
            this.address_post = "";
            this.description = "";
            this.phone_post = "";
            this.description = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.post {
  padding: 50px 0;
  width: 600px;
  margin: 0 auto;
}
.btn-create {
  background: greenyellow !important;
}
.action-create {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.btn-back {
  margin-right: 20px;
}
.action-create > button {
  background: #fff;
  border: 1px solid #ccc;
  padding: 8px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}
</style>