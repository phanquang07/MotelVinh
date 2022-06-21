<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tiêu đề</th>
          <th scope="col">Loại</th>
          <th scope="col">Khu vực</th>
          <th scope="col">Giá</th>
          <th scope="col">Diện tích</th>
          <th scope="col">Tác giả</th>
          <th scope="col">Thời gian tạo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.category ? item.category.name : "" }}</td>
          <td>{{ item.district ? item.district.name : "" }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.author ? item.author.name : "" }}</td>
          <td>{{ new Date(item.created_time).toLocaleString() }}</td>
          <td>
            <a href="#" class="text-warning" @click="showModal(item._id)">
              Sửa
            </a>
            /
            <a href="#" class="text-danger" @click="handleDelete(item._id)">
              Xoá
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal -->
    <a-modal
      title="Chỉnh sửa thông tin bài đăng"
      :visible="visible"
      @cancel="handleCancel"
    >
      <div class="">
        <div class="list-info">
          <label for="">Tiêu đề bài đăng</label>
          <a-input placeholder="Tiêu đề bài đăng" v-model="titlePost" />
        </div>
        <div class="list-info">
          <label for="">Loại phòng</label>
          <a-select
            default-value="0"
            style="width: 100%"
            v-model="typePost"
            @change="handleChangeType"
          >
            <a-select-option value="0" disabled>
              -- Chọn loại phòng --
            </a-select-option>
            <a-select-option
              v-for="item in listType"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="list-info">
          <label for="">Khu vực</label>
          <a-select
            default-value="0"
            style="width: 100%"
            v-model="districtPost"
            @change="handleChangeDistrict"
          >
            <a-select-option value="0" disabled>
              -- Chọn khu vực --
            </a-select-option>
            <a-select-option
              v-for="item in listDistrict"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="list-info">
          <label for="">Giá phòng</label>
          <a-input placeholder="Giá phòng" v-model="pricePost" />
        </div>
        <div class="list-info">
          <label for="">Diện tích</label>
          <a-input placeholder="Diện tích" v-model="areaPost" />
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Hủy </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          Lưu
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      list: [],
      visible: false,
      loading: false,
      listDistrict: [],
      listType: [],
      postInfo: {},
      titlePost: "",
      typePost: "",
      districtPost: "",
      pricePost: "",
      areaPost: "",
    };
  },
  mounted() {
    this.fetch();
    this.fetchDistrict();
    this.fetchCategory();
  },
  methods: {
    fetch() {
      let data = {
        filter: {},
      };
      let url = "http://localhost:3008/api/motel/list";
      this.$axios
        .post(url, { data: data })
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
    handleDelete(id) {
      let url = "http://localhost:3008/api/motel/delete/" + id;
      this.$axios
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.fetch();
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    handleChangeType(val) {
      this.typePost = val;
    },
    handleChangeDistrict(val) {
      this.districtPost = val;
    },
    showModal(id) {
      this.visible = true;
      this.list = this.list.filter((item) => {
        return item._id == id;
      });
      this.postInfo = this.list[0];
      this.titlePost = this.postInfo.title;
      this.typePost = this.postInfo.category._id;
      this.districtPost = this.postInfo.district._id;
      this.pricePost = this.postInfo.price;
      this.areaPost = this.postInfo.area;
    },
    handleCancel(e) {
      this.visible = false;
      this.postInfo = {};
      this.titlePost = "";
      this.typePost = "";
      this.districtPost = "";
      this.pricePost = "";
      this.areaPost = "";
      this.fetch();
    },
    handleOk(e) {
      this.loading = true;
      let data = {};
      data.title = this.titlePost;
      data.category = this.typePost;
      data.district = this.districtPost;
      data.price = this.pricePost;
      data.area = this.areaPost;
      let url = "http://localhost:3008/api/motel/update/" + this.postInfo._id;
      this.$axios
        .post(url, { data: data })
        .then((res) => {
          if (res.data.success) {
            this.loading = false;
            this.visible = false;
            this.fetch();
            this.$notify({
              type: "success",
              title: "Thông báo",
              text: "Cập nhật thông tin bài đăng thành công !",
            });
            this.postInfo = {};
            this.titlePost = "";
            this.typePost = "";
            this.districtPost = "";
            this.pricePost = "";
            this.areaPost = "";
          } else {
            this.visible = true;
            this.$notify({
              type: "error",
              title: "Thông báo",
              text: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
<style scoped>
.list-info {
  margin-bottom: 10px;
}
.list-info:last-child {
  margin-bottom: 0;
}
</style>