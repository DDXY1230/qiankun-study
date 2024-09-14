<template>
  <div class="">Home</div>
</template>

<script>
import { defineComponent } from "vue";
import { io } from "socket.io-client";
import log from "./../common/utils/log";
console.log("------12345");
log.info("999");

export default defineComponent({
  name: "MyHome",
  setup() {
    const socket = io("http://localhost:3000", {
      reconnectionDelayMax: 10000, // 重连最大延时
      auth: {
        token: "123",
      },
      query: {
        "my-key": "my-value",
      },
    });
    socket.on("connect", () => {
      console.log("连接成功");
    });
    socket.on("disconnect", () => {
      console.log("连接失败");
    });
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
