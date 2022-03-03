<template>
  <div class="register">
    <!-- Form register -->
    <h1 style="margin-top: 20px"><strong>Đăng ký</strong></h1>
    <a-form method="POST" :form="form" @submit="handleSubmit">
      <a-form-item label="E-mail">
        <a-input
          placeholder="Nhập email"
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'Email không hợp lệ!',
                },
                {
                  required: true,
                  message: 'Hãy nhập lại email của bạn!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <p v-if="checkEmail" class="text-validate">Email đã tồn tại</p>
      <a-form-item label="Mật khẩu">
        <a-input
          type="password"
          placeholder="Nhập mật khẩu"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập mật khẩu của bạn!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Nhập lại mật khẩu">
        <a-input
          type="password"
          placeholder="Nhập lại mật khẩu"
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập lại mật khẩu của bạn!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <p v-if="checkPass" class="text-validate">Mật khẩu chưa trùng khớp</p>
      <a-form-item>
        <span slot="label"> Tên của bạn&nbsp; </span>
        <a-input
          placeholder="Nhập tên"
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập tên đăng nhập của bạn!',
                  whitespace: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Số điện thoại">
        <a-input
          type="tel"
          placeholder="Nhập số điện thoại"
          v-decorator="[
            'phone',
            {
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập số điện thoại của bạn!',
                },
              ],
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> Đăng ký </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  // layout: 'motel_base',
  data() {
    return {
      checkPass: false,
      checkEmail: false,
      // form: null,
      // Form register, login
      confirmDirty: false,
      autoCompleteResult: [],
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  mounted() {
    // console.log(process.env.apiUrl);
  },
  methods: {
    ...mapMutations(["setLogin"]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          if (values.password != values.confirm) {
            this.checkPass = true;
            return;
          }
          let url = "http://localhost:3008/api/user/register";
          this.$axios.post(url , values).then(res => {
            if(res.data.success) {
              localStorage.setItem('motel-token', res.data.token)
              res.data.data.isLogin = true
              this.setLogin(res.data.data)
              this.$router.push('/')
            }
          }).catch( err => {
            if(!err.response.data.success && err.response.data.message == "Email đã tồn tại!") {
              this.checkEmail = true
            }
            console.log(err.response)
          })
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 70%;
  margin: 0 auto;
}
.text-validate {
  position: relative;
  top: -25px;
  color: #f5222d;
  margin: 0;
}
</style>