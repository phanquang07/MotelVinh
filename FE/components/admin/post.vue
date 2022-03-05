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
          <td>{{ item.category ?  item.category.name : "Đã xoá"}}</td>
          <td>{{ item.district ? item.district.name : "Đã xoá"}}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.author ?  item.author.name : "Đã xoá" }}</td>
          <td>{{ new Date(item.created_time).toLocaleString() }}</td>
          <td>
            <a href="#" class="text-warning">Sửa</a> /
            <a href="#" class="text-danger" @click="handleDelete(item._id)">Xoá</a>
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
  },
};
</script>