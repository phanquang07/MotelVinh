<template>
  <div class="admin-address">
    <div class="admin-address-inner">
      <input
        v-model="name"
        type="text"
        class="form-control admin-input"
        placeholder="Thêm địa điểm"
      />
      <button class="btn-address btn-sub" @click="add">Thêm</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên</th>
          <th scope="col">Last</th>
          <th scope="col">Last</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
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
      title="Chỉnh sửa thông tin loại phòng"
      :visible="visible"
      @cancel="handleCancel"
    >
      <div class="">
        <div class="list-info">
          <label for="">Tên địa điểm</label>
          <a-input placeholder="Tên địa điểm" v-model="nameDistrict" />
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
      districtInfo: {},
      nameDistrict: "",
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    add() {
      if (!this.name) return;
      let url = "http://localhost:3008/api/district/create";
      this.$axios
        .post(url, { name: this.name })
        .then((res) => {
          if (res.data.success) {
            // this.list = res.data.data;
            this.name = "";
            this.fetch();
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetch() {
      let url = "http://localhost:3008/api/district/list";
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
      let url = "http://localhost:3008/api/district/delete/" + id;
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
    showModal(id) {
      this.visible = true;
      this.list = this.list.filter((item) => {
        return item._id == id;
      });
      this.districtInfo = this.list[0];
      this.nameDistrict = this.districtInfo.name;
    },
    handleCancel(e) {
      this.visible = false;
      this.districtInfo = {};
      this.nameDistrict = "";
      this.fetch();
    },
    handleOk(e) {
      this.loading = true;
      let data = {};
      data.name = this.nameDistrict;
      let url =
        "http://localhost:3008/api/district/update/" + this.districtInfo._id;
      this.$axios
        .post(url, data)
        .then((res) => {
          if (res.data.success) {
            this.loading = false;
            this.visible = false;
            this.fetch();
            this.$notify({
              type: "success",
              title: "Thông báo",
              text: "Cập nhật thông tin địa điểm thành công !",
            });
            this.districtInfo = {};
            this.nameDistrict = "";
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
<style lang="scss" scoped>
.admin-address {
  .admin-address-inner {
    display: flex;
    max-width: 40rem;
  }
}
</style>