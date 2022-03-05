<template>
  <div>
    <div style="display: flex; margin-bottom: 20px">
      <input
        v-model="name"
        type="text"
        class="form-control"
        style="width: 500px"
      />
      <button class="btn btn-success" @click="add">Thêm</button>
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
            this.fetch()
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>