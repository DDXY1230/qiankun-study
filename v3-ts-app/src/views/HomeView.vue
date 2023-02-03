<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
   <el-button type="danger" disabled>Danger</el-button> -->

  <div class="common-layout">
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.png" alt="">
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <span>Tina</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col>
              <el-menu active-text-color="#ffd04b" 
              background-color="#545c64" 
              class="el-menu-vertical-demo" 
              default-active="2" text-color="#fff" 
              router
              @open="handleOpen" 
              @close="handleClose">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location />
                    </el-icon>
                    <span>Navigator One</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon>
                    <icon-menu />
                  </el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item v-for="i in list" :key="i.path" :index="i.path">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>{{i.meta.title}}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
            mm
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "HomeView",
  components: {
    // HelloWorld,
  },
  setup() {
    const router = useRouter()
    const list = router.getRoutes().filter(v => v.meta.isShow)
    console.log('list',list)
    return {
      list
    }
  }
});
</script>
<style lang="scss">
.el-header {
  border: 1px solid rgb(32, 23, 23);
  background: rgb(32, 23, 23);
  color: #fff;
  line-height: 80px;
  text-align: center;
  img {
    height: 80px;
  }
}
.el-aside {
  .tac {
    height: calc(100vh - 80px);
    .el-menu {
      height: 100%;
    }
  }
}
</style>
