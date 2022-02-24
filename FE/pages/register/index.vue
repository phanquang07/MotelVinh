<template>
  <div class="register">
    <!-- Form register -->
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="E-mail">
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
      <a-form-item v-bind="formItemLayout" label="Mật khẩu" has-feedback>
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
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="Nhập lại mật khẩu"
        has-feedback
      >
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
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label"> Tên đăng nhập&nbsp; </span>
        <a-input
          placeholder="Nhập tên đăng nhập"
          v-decorator="[
            'nickname',
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
      <a-form-item v-bind="formItemLayout" label="Số điện thoại">
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
      <a-form-item
        v-bind="formItemLayout"
        label="Mã xác thực"
        extra="Chúng tôi phải đảm bảo bạn không phải robot."
      >
        <a-row :gutter="8">
          <a-col :lg="20">
            <a-input
              placeholder="Nhập mã xác thực"
              v-decorator="[
                'captcha',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Hãy nhập mã xác thực của bạn!',
                    },
                  ],
                },
              ]"
            />
          </a-col>
          <a-col :lg="4" :md="4">
            <a-button style="width: 100%" html-type="submit">Gửi mã</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          Tôi đã đọc
          <a href=""> Thỏa thuận người dùng </a>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit"> Đăng ký </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  layout: 'motel_base',
  data() {
    return {
      // Form register, login
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
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
  handleConfirmBlur(e) {
    const value = e.target.value;
    this.confirmDirty = this.confirmDirty || !!value;
  },
  compareToFirstPassword(rule, value, callback) {
    const form = this.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  },
  validateToNextPassword(rule, value, callback) {
    const form = this.form;
    if (value && this.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  },
};
</script>

<style lang="scss" scoped>

</style>