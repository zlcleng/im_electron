<template>
  <div class="toolbar">
    <my-profile />
    <nav-menus />
    <div>
      <el-icon class="min-size" @click="minSizeWin"><Minus /></el-icon>
      <el-icon class="max-size" @click="maxSizeWin"><CopyDocument /></el-icon>
      <el-icon class="close-btn" @click="closeWin"><Close /></el-icon>
    </div>
  </div>
  <div class="side-bar-wrapper">
    <RouterView />
  </div>
</template>
<script setup>
import { ipcRenderer } from 'electron'
import MyProfile from './layout/components/MyProfile.vue'
import NavMenus from './layout/components/NavMenus.vue'

const minSizeWin = () => {
  ipcRenderer.send('window-min')
}
const maxSizeWin = () => {
  ipcRenderer.send('window-max')
}
const closeWin = () => {
  ipcRenderer.send('window-close')
}
</script>
<style lang="less" scoped>
.side-bar-wrapper {
  flex: 1;
  overflow:hidden;
  display: flex;
  height: calc(100% - 63px);
}

.toolbar {
  height: 60px;
  padding: 12px 8px 12px 20px;
  background-color: @background-white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;
  margin-bottom: 2px;
  .min-size,.max-size,.close-btn {
    cursor: pointer;
    font-size: 28px;
    padding: 0px 8px;
    -webkit-app-region: no-drag;
    color: #4D4D4D;
    margin-right: 10px;
    &:hover, &:focus {
      background: rgba(111, 136, 165, 0.4);
    }
  }
}
</style>
