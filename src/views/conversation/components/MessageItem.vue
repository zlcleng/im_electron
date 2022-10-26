<template>
  <div class="message-wrapper" :class="messagePosition">
    <p class="text-time">2022.09.22</p>
    <div
      class="c2c-layout"
      :class="messagePosition"
    >
      <div class="col-1">
        <!-- 头像 -->
        <Avatar class="avatar" />
      </div>
      <div class="col-2">
        <!-- 消息主体 -->
        <div class="content-wrapper">
          <!-- <li :class="{ 'right-message': true, 'left-message': false }"> -->
            <div class=""> sdgjkashdjk奥萨蒂哈岁的和 </div>
          <!-- </li> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Avatar from '../../../components/Avatar/index.vue'
</script>
<style lang="less" scoped>
.message-wrapper {
  margin: 20px 0;

  .content-wrapper {
    display: flex;
    align-items: center;
  }
  .c2c-layout {
    display: flex;
    .col-1 {
      .avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
      }
    }

    .col-2 {
      display: flex;
      flex-direction: column;
      // max-width 50% // 此设置可以自适应宽度，目前由bubble限制
    }
  }
}
</style>
