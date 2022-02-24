<template>
  <div class="post">
    <div>
      <label for="">Nhập tiêu đề</label>
      <input
        type="text"
        class="input-group"
        placeholder="Nhập tiêu đề ..."
        v-model="title_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập loại phòng</label>
      <input
        type="number"
        class="input-group"
        placeholder="Nhập loại phòng ..."
        v-model="type_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập giá phòng</label>
      <input
        type="number"
        class="input-group"
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
        class="input-group"
        placeholder="Nhập diện tích ..."
        v-model="area_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập địa chỉ</label>
      <input
        type="text"
        class="input-group"
        placeholder="Nhập đại chỉ ..."
        v-model="address_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập tên chủ trọ</label>
      <input
        type="text"
        class="input-group"
        placeholder="Nhập tên chủ trọ ..."
        v-model="author_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Nhập số điện thoại</label>
      <input
        type="text"
        class="input-group"
        placeholder="Nhập số điện thoại ..."
        v-model="phone_post"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
    <div>
      <label for="">Mô tả</label>
      <input
        type="text"
        class="input-group"
        placeholder="Mô tả ..."
        v-model="description"
        @input="changeInput"
      />
    </div>
    <br />
    <!--  -->
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
    };
  },
  methods: {
    changeInput() {
      // console.log("inputTitle", this.title_post);
      // console.log("inputType", this.type_post);
      // console.log("inputPrice", this.price_post);
    },
    async handleSave() {
      console.log("title", this.title_post);
      const url = "http://localhost:3008";
      await this.$axios.post(url + "/api/posts/create", {
        title: "đây là test",
        // type: this.type_post,
        // price: this.price_post,
        // vote: this.vote_post,
        // area: this.area_post,
        // address: this.address_post,
        // images: this.images_post,
        // author: this.author_post,
        // phone: this.phone_post,
        // description: this.description,
      }) 
      .then(res => {
        console.log("data", res.data);
      }) ;
    },
  },
};
</script>

<style>
</style>