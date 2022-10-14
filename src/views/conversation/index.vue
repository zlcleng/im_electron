<template>
  <el-row>
    <el-col :xs="6" :sm="6" :md="5" :lg="5" :xl="4">
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
    </el-col>
    <el-col :xs="18" :sm="18" :md="19" :lg="19" :xl="20" class="right-wrap">
      <Chat/>
    </el-col>
  </el-row>
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
.el-row {
  height: 100%;
  .right-wrap {
    background-color: #f5f5f5;
  }
}
.list-container {
  height: 100%;
  width: 100%;
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