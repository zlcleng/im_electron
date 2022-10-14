<template>
  <header class="message-info-view__header">
    <div class="message-info-view__header--avatar" >
      <AvatarWithProfile v-if="conv_type === 1" profile={profile} />
      <Avatar v-else />
      <span class="message-info-view__header--name">姓名</span>
    </div>
    <!-- <GroupToolsDrawer /> -->
  </header>
</template>
<script setup>
import { ref } from "vue"
import Avatar from '../../../components/Avatar/index.vue'

const conv_type = ref(false)
</script>