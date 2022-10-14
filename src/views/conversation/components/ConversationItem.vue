<template>
  <div class="conversion-list__item" :class="{ 'is-active': false, 'is-pinned': false }" >
    <div class="conversion-list__item--profile">
      <div class="conversion-list__item--profile___unread">99</div>
      <Avatar />
    </div>
    <div class="conversion-list__item--info">
      <div class="conversion-list__item--time-wrapper">
        <span class="conversion-list__item--nick-name">名字</span>
        <span class="conversion-list__item--format-time">14:53</span>
      </div>
      <div class="conversion-list__item--last-message">欢迎查看欢迎查看欢迎</div>
    </div>
    <span class="pinned-tag"></span>
    <span class="mute"></span>
  </div>
</template>
<script setup>
import Avatar from '../../../components/Avatar/index.vue'
</script>
<style lang="less" scoped>
.conversion-list {
    overflow-y: overlay;
    overflow-x: hidden;
    flex: 1;   
    &:hover {
      &::-webkit-scrollbar {
        width:6px;
        background-color:transparent;
      }
      &::-webkit-scrollbar-thumb {
        border-radius:8px;
        box-shadow:inset 0 0 2px rgba(0,0,0,.3);
        background-color:#d1d1d1;
      }
    } 
    &::-webkit-scrollbar {
      width:0px;
      background-color:transparent;
    }
   
    &::-webkit-scrollbar-track {
      background-color:transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: transparent;
    }
    &__item {
      display: flex;
      padding: 13px 12px 13px 2px;
      position: relative;
      &:hover {
        background-color: #E8F2FF;
      }
      cursor: pointer;
      &--profile {
        position: relative;
        width: 36px;
        height: 36px;
        &___unread {
          position: absolute;
          top: 0;
          right: 0;
          width: 16px;
          height: 16px;
          background: #FF584C;
          font-size: 10px;
          transform: scale(10 / 12);
          transform-origin: left center;
          color: #fff;
          border-radius: 8px;
          text-align: center;
          line-height: 16px;
        }
      }
      
      &--info {
        padding-left: 8px;
        flex: 1;
        overflow: hidden;
      }

      &--time-wrapper {
        display: flex;
        justify-content: space-between;
      }

      &--format-time {
        font-size: 12px;
        font-weight: 400;
        color: #BBBBBB;
        white-space: nowrap;
      }

      &--nick-name {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        line-height: 20px;
        min-height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      &--last-message {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        height: 16px;
        line-height: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .icon {
          width: 16px;
          height: 16px;
          background-image: url('../../../assets/icon/not-read.svg');
          background-repeat: no-repeat;
          background-position: center;
        }
        .icon.is-read {
          background-image: url('../../../assets/icon/readed.svg');
        }
        .at-msg {
          color: #FF584C;
        }
      }

      &.is-active {
        background: #E8F2FF;
      }
      .pinned-tag {
        display: none;
      }
      .mute {
        position: absolute;
        width: 14px;
        height: 14px;
        background-image: url('../../../assets/icon/mute.png');
        background-size: 14px 14px;
        background-position: 0 0;
        top: 50%;
        // margin-top: -7px;
        right: 10px;
      }
    &.is-pinned {
      .pinned-tag{
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        // background-color: #006EFF;
        border: 6px solid #006EFF;
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
    }
  }
}
</style>
