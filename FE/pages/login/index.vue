<template>
  <div class="login">
    <!-- Form login -->
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                { required: true, message: 'Hãy nhập tên đăng nhập của bạn!' },
              ],
            },
          ]"
          placeholder="Tên đăng nhập"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Hãy nhập mật khẩu của bạn!' },
              ],
            },
          ]"
          type="password"
          placeholder="Mật khẩu"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Ghi nhớ đăng nhập
        </a-checkbox>
        <a class="login-form-forgot" href=""> Quên mật khẩu? </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Đăng nhập
        </a-button>
        hoặc
        <nuxt-link to="/register"> Đăng ký ngay! </nuxt-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  layout: 'motel_base',
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// Login
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>