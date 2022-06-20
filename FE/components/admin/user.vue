<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Tên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col" v-if="role == 1">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.email }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ new Date(item.created_time).toLocaleString() }}</td>
          <td v-if="role == 1">
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
      title="Chỉnh sửa thông tin tải khoản"
      :visible="visible"
      @cancel="handleCancel"
    >
      <div class="">
        <div class="list-info">
          <label for="">Tên tài khoản</label>
          <a-input placeholder="Tên tài khoản" v-model="nameUser" />
        </div>
        <div class="list-info">
          <label for="">Email</label>
          <a-input placeholder="Email" v-model="emailUser" />
        </div>
        <div class="list-info">
          <label for="">Mật khẩu mới</label>
          <a-input placeholder="Nhập mật khẩu mới" v-model="passNew" />
        </div>
        <div class="list-info">
          <label for="">Nhập lại mật khẩu</label>
          <a-input placeholder="Nhập lại mật khẩu mới" v-model="passNewAgain" />
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
      list: [],
      role: 2,
      visible: false,
      loading: false,
      userInfo: {},
      nameUser: "",
      emailUser: "",
      passNew: "",
      passNewAgain: "",
    };
  },
  mounted() {
    this.fetchUser();
    this.checkRole();
  },
  watch: {
    passNewAgain(val) {
      if (val !== this.passNew) {
        this.$notify({
          type: "error",
          title: "Thông báo",
          text: "Vui lòng nhập lại mật khẩu !",
        });
      }
    },
  },
  methods: {
    checkRole() {
      this.role = localStorage.getItem("role");
    },
    fetchUser() {
      let url = "http://localhost:3008/api/user/list";
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.success) {
            this.list = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    handleDelete(id) {
      let url = "http://localhost:3008/api/user/delete/" + id;
      this.$axios
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.fetchUser();
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    showModal(id) {
      this.visible = true;
      this.list = this.list.filter((item) => {
        return item._id == id;
      });
      this.userInfo = this.list[0];
      this.nameUser = this.userInfo.name;
      this.emailUser = this.userInfo.email;
    },
    handleCancel(e) {
      this.visible = false;
      this.userInfo = {};
      this.nameUser = "";
      this.emailUser = "";
      this.passNew = "";
      this.passNewAgain = "";
      this.fetchUser();
    },
    handleOk(e) {
      this.loading = true;
      let data = {};
      data.name = this.nameUser;
      data.email = this.emailUser;
      if (this.passNew) {
        data.password = this.passNew;
      }
      let url = "http://localhost:3008/api/user/update/" + this.userInfo._id;
      this.$axios
        .post(url, { data: data })
        .then((res) => {
          if (res.data.success) {
            this.loading = false;
            this.visible = false;
            this.fetchUser();
            this.$notify({
              type: "success",
              title: "Thông báo",
              text: "Cập nhật thông tin tài khoản thành công !",
            });
            this.userInfo = {};
            this.nameUser = "";
            this.emailUser = "";
            this.passNew = "";
            this.passNewAgain = "";
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