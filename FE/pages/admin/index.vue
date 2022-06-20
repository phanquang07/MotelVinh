<template>
  <div class="admin">
    <div class="admin-heading-wrap">
      <div class="grid wide">
        <div class="back-home">
          <button class="btn-back-home" @click="backHome">Trang chủ</button>
        </div>
        <div class="admin-heading">
          <div
            v-for="(item, idx) in heading"
            :key="idx"
            class="heading-item"
            @click="handleActive(item.key)"
            :style="{ background: headActive[item.key] ? 'red' : '#0071c2' }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="admin-body" v-if="role == 1">
      <div class="grid wide">
        <User v-if="headActive.user" />
        <Address v-if="headActive.address" />
        <Category v-if="headActive.category" />
        <Post v-if="headActive.post" />
      </div>
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
    Post,
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
      role: 2,
    };
  },
  mounted() {
    this.checkRole();
  },
  methods: {
    handleActive(key) {
      console.log("key active", key);
      for (let h in this.headActive) {
        console.log("h", h);
        this.headActive[h] = false;
      }
      this.headActive[key] = true;
    },
    backHome() {
      this.$router.push("/");
    },
    checkRole() {
      this.role = localStorage.getItem("role");
    },
  },
};
</script>
<style lang="scss" scoped>
.admin {
  .admin-heading-wrap {
    .admin-heading {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      .heading-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.8rem 2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        color: $text2-color;
        font-weight: 700;
        background-color: $main-color;
        margin: 0 0.2rem;
        &:hover {
          background-color: $hover-color;
        }
      }
    }
  }
  .admin-body {
    background-color: $border-color;
    margin-top: 1rem;
  }
  .btn-back-home {
    background: #fff;
    border: 1px solid #ccc;
    padding: 8px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background: $price-color;
      border: 1px solid $price-color;
    }
  }
  .back-home {
    padding: 15px 0;
  }
}
</style>