<template>
  <div class="side-bar">
    <el-menu
      class="tab-items"
      :unique-opened="true"
      :collapse="true"
    >
      <router-link v-for="route in asyncRoutes[0].children" :key="route.path" :to="route.path">
        <el-menu-item
          :index="route.path"
        >
          <i :class="['iconfont', route.meta.icon]" />
          <p> {{ route.meta.title }} </p>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>
<script setup>
import { asyncRoutes } from '../router/routes.js'

</script>
<style lang="less" scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 56px;
  list-style: none;
  background: @background;
  position: relative;
  padding: 0 2px 12px;
  .tab-items {
    background-color: transparent;
    border-right: none;
  }
  .el-menu {
    width: 100%;
    &-item {
      width: 52px;
      height: 52px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: @background-white;
      border-radius: 4px;
      // padding: 8px 0;
      // color: #fff;
      line-height: inherit;
      font-size: 10px;
      // &.is-active {
      //   color: #409eff;
      // }
    }
  }
}
.content {
  flex: 1;
  overflow:hidden;
  background-color: #fff;
  border-top-left-radius: 4px;
}
</style>
