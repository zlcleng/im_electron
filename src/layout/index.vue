<template>
  <div class="toolbar">
    <my-profile />
    <div>
      <el-icon class="min-size" @click="minSizeWin"><Minus /></el-icon>
      <el-icon class="max-size" @click="maxSizeWin"><CopyDocument /></el-icon>
      <el-icon class="close-btn" @click="closeWin"><Close /></el-icon>
    </div>
  </div>
  <div class="side-bar-wrapper">
    <div class="nav">
      <el-menu
        class="tab-items"
        :unique-opened="true"
        :collapse="true"
      >
        <template v-for="route in asyncRoutes[0].children" :key="route.path">
          <router-link :to="route.path">
            <el-menu-item
              :index="route.path"
            >
              <i :class="['iconfont', route.meta.icon]" />
              <p> {{ route.meta.title }} </p>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </div>
    <div class="content">
      <RouterView />
      <!-- <conversation-list v-show="showConversationList" />
      <group-list v-show="showGroupList" />
      <friend-list v-show="showFriendList" />
      <black-list v-show="showBlackList" /> -->
    </div>
  </div>
</template>
<script setup>
import { ipcRenderer } from 'electron'
// import { getCurrentWindow } from '@electron/remote'
import { asyncRoutes } from '../router/routes.js'
import MyProfile from './components/MyProfile.vue'


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
  height: calc(100% - 40px);
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65px;
    list-style: none;
    background: @background-deep-dark;
    position: relative;
    padding: 0 5px;
    .tab-items {
      background-color: transparent;
      border-right: none;
    }
    .el-menu {
      width: 100%;
      &-item {
        flex-direction: column;
        background-color: @background;
        border-radius: 6px;
        padding: 8px 0;
        color: #fff;
        line-height: inherit;
        &.is-active {
          color: #409eff;
        }
      }
    }
  }
  .content {
    flex: 1;
    overflow:hidden;
    background-color: #fff;
    border-top-left-radius: 12px;
  }
  
.userinfo-avatar{
    &.ismac{
        margin-top: 62px;
    }
    margin-top: 24px;
  }
}

.toolbar {
  height: 40px;
  padding: 5px 15px;
  background-color: @background-deep-dark;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;
  .min-size,.max-size,.close-btn {
    cursor: pointer;
    font-size: 28px;
    padding: 0px 8px;
    -webkit-app-region: no-drag;
    color: #fff;
    margin-left: 10px;
    &:hover, &:focus {
      background: rgba(111, 136, 165, 0.4);
    }
  }
}
</style>
