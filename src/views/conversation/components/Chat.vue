<template>
  <div class="message-info-view" id="messageInfo">
    <ChatHeader />
    <section class="message-info-view__content">
      <!-- 历史消息 -->
      <MessageItem v-for="item in 5" />
      <!-- 输入框 -->
      <ChatInput />
    </section>
  </div>
</template>
<script setup>
import ChatHeader from './ChatHeader.vue'
import ChatInput from './ChatInput.vue'
import MessageItem from './MessageItem.vue'

</script>
<style lang="less" scoped>
:deep(.message-info-view) {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    height: 36px;
    border-bottom: 1px solid #eee;

    &--avatar {
      display: flex;
      align-items: center;
    }

    &--name {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      margin-left: 12px;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &--view {
      overflow: hidden;
      flex: 1;
      border-bottom: 1px solid #eee;
    }

    &--input {
      height: 173px;
    }
  }
}

</style>