<template>
  <header class="header">
    <a-row class="header-above">
      <div class="grid wide">
        <a-col :lg="12" :md="12" class="header-above-left">
          <nuxt-link to="/" class="logo-item-link link">
            <img
              class="logo-item-img"
              src="~/assets/images/logo/logo.png"
              alt="Phòng trọ thành phố Vinh"
            />
          </nuxt-link>
        </a-col>
        <a-col :lg="12" :md="12" class="header-above-right">
          <div class="login-wrap">
            <div class="login-item register">
              <nuxt-link to="/register" class="login-item-link link"
                >Đăng ký</nuxt-link
              >
            </div>
            <div class="login-item login">
              <nuxt-link to="/login" class="login-item-link link"
                >Đăng nhập</nuxt-link
              >
            </div>
          </div>
        </a-col>
      </div>
    </a-row>
    <a-affix>
      <a-row class="navbar-wrap">
        <div class="grid wide">
          <a-col :lg="20" :md="20" class="navbar">
            <ul class="nav-list mar-pad">
              <li class="nav-item list" v-for="item in navList" :key="item.id">
                <nuxt-link :to="item.path" class="nav-item-link link">
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </a-col>
          <a-col :lg="4" :md="4" class="post">
            <nuxt-link to="/post/create" class="post-item-link link"
              >Đăng tin</nuxt-link
            >
          </a-col>
        </div>
      </a-row>
    </a-affix>
  </header>
</template>
<script>
import navData from "~/api/navList.json";
export default {
  data() {
    return {
      // navbar
      navList: navData.navList,
    };
  },
  methods: {
    handleButtonClick(e) {
      console.log("click left button", e);
    },
    handleMenuClick(e) {
      console.log("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  // position: fixed;
  // z-index: 10000;
  // width: 100%;
}
.header-above {
  background: $white-color;
  padding: 1rem 0;
  .header-above-left {
    .logo-item-link {
      max-width: 12rem;
      .logo-item-img {
        width: 100%;
      }
    }
  }
  .header-above-right {
    .login-wrap {
      display: flex;
      justify-content: flex-end;
      .login-item {
        margin-top: 0.6rem;
        .login-item-link {
          margin-left: 1rem;
          padding: 1rem 2rem;
          color: $text2-color;
          background: $hover-color;
          border-radius: 0.5rem;
          font-weight: 700;
        }
      }
    }
  }
}
.navbar-wrap {
  background: $main-color;
  .navbar {
    .nav-list {
      display: flex;
      .nav-item {
        .nav-item-link {
          padding: 1.2rem 2rem;
          color: $text2-color;
          font-weight: 700;
          background: $main-color;
          border-right: 0.1rem solid $border-color;
          &:hover {
            background: $hover-color;
          }
        }
      }
    }
  }
  .post {
    .post-item-link {
      float: right;
      padding: 1.2rem 2.6rem;
      font-weight: 700;
      color: $text2-color;
      background: $hover-color;
    }
  }
}
</style>