<template>
  <el-menu
    class="nav-menu"
    :ellipsis="false"
    mode="horizontal"
  >
    <router-link
      v-for="(item, index) in asyncRoutes"
      :to="item.path"
      :key="index"
      :class="['nav-menu-item', { 'is-active': activePath.indexOf(item.path) > -1 }]"
    >
      <el-menu-item :index="item.path">{{ item.meta.title }}</el-menu-item>
    </router-link>
  </el-menu>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { asyncRoutes } from 'router/routes.js'

const $route = useRoute()
const activePath = computed(() => $route.meta.activePath || $route.path);
</script>
<style lang="less" scoped>
.nav-menu {
  height: 40px;
  background: #F2F2F2;
  border-radius: 4px;
  padding: 3px;
  color: #4D4D4D;
  -webkit-app-region: no-drag;
  --el-menu-hover-bg-color: #fff;
  border-bottom: none;
  &-item{
    color: #4D4D4D;
    &.is-active, &:hover, &:focus {
      background-color: #fff;
      border-radius: 3px;
      border: none;
    }
    :deep(.el-menu-item) {
      height: 100%;
      line-height: 100%;
    }
    & + & {
      margin-left: 10px;
    }
  }
}
</style>