<template>
  <div class="conversation-wrap">
    <div class="list-container">
      <div class="header-bar">
        <el-input
          v-model="input1"
          placeholder="搜索"
          class="header-bar__search"
          :suffix-icon="Search"
        />
        <el-icon @click="handleAddButtonClick"><Plus /></el-icon>
      </div>
      <div class="scroll-container">
        <conversation-item
          :conversation="item"
          v-for="item in conversationList"
          :key="item.conversationID"
        />
      </div>
    </div>
    <div class="drag-border" v-drag></div>
    <div class="right-wrap">
      <Chat/>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import ConversationItem from './components/ConversationItem.vue'
import Chat from './components/Chat.vue'
import { Search } from '@element-plus/icons-vue'

const conversationList = ref([
  {
    conversationID: 0
  },
  {
    conversationID: 1
  }
])
</script>
<style lang="less" scoped>
.conversation-wrap {
  height: 100%;
  display: flex;
  .right-wrap {
    flex: 1;
    background-color: #f5f5f5;
  }
}
.list-container {
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column; // -reverse
  .header-bar {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 50px;
    padding: 10px 10px 10px 20px;
    &__search {
      margin-right: 10px;
      :deep(.el-input) {
        &__wrapper {
          border-radius: 40px;
        }
      }
    }
  }
  .scroll-container {
    overflow-y: auto;
    flex: 1;
  }
}
.bottom-circle-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.refresh {
  bottom: 70px;
}
</style>