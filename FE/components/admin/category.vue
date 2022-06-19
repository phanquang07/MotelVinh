<template>
  <div>
    <div class="admin-categry">
      <div class="admin-categry-inner">
        <input
          v-model="name"
          type="text"
          class="form-control admin-input"
          placeholder="Thêm loại phòng"
        />
        <button class="btn btn-sub" @click="add">Thêm</button>
      </div>
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
            <a href="#" class="text-warning">Sửa</a> /
            <a href="#" class="text-danger" @click="handleDelete(item._id)"
              >Xoá</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      list: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    add() {
      if (!this.name) return;
      let url = "http://localhost:3008/api/category/create";
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
      let url = "http://localhost:3008/api/category/list";
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
      let url = "http://localhost:3008/api/category/delete/" + id;
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
  },
};
</script>
<style lang="scss" scoped>
.admin-categry-inner {
  display: flex;
  max-width: 40rem;
}
</style>