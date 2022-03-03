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
  </div>
</template>
<script>
export default {
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
          this.headActive[h] = false
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