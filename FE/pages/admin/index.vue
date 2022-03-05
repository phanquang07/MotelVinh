<template>
  <div>
    <div class="heading">
      <div
        v-for="(item, idx) in heading"
        :key="idx"
        class="heading-item"
        @click="handleActive(item.key)"
        :style="{ color: headActive[item.key] ? 'red' : 'black' }"
      >
        {{ item.name }}
      </div>
    </div>
     <div class="container-fluid" style="font-size: 17px;">
          <User v-if="headActive.user" />
          <Address v-if="headActive.address" />
          <Category v-if="headActive.category" />
          <Post v-if="headActive.post" />
      </div>
  </div>
</template>
<script>
import User from "../../components/admin/user.vue";
import Address from "../../components/admin/address.vue";
import Category from "../../components/admin/category.vue";
import Post from "../../components/admin/post.vue";
export default {
  components: {
    User,
    Address,
    Category,
    Post
  },
  data() {
    return {
      heading: [
        {
          name: "Người dùng",
          key: "user",
        },
        {
          name: "Bài viết",
          key: "post",
        },
        {
          name: "Địa điểm",
          key: "address",
        },
        {
          name: "Thể loại",
          key: "category",
        },
      ],
      headActive: {
        user: true,
        post: false,
        address: false,
      },
    };
  },
  methods: {
    handleActive(key) {
      for (let h in this.headActive) {
        this.headActive[h] = false;
      }
      this.headActive[key] = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.heading {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #fff;

  .heading-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    font-weight: 700;
  }

  .heading-item:hover {
    color: red;
  }
}
</style>