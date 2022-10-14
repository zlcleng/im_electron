import { defineStore } from 'pinia'

export const useConversationStore = defineStore({
  id: 'ConversationStore',
  state: () => {
    return {
      isImLogin: false,
      isSDKReady: false, // TIM SDK 是否 ready
      isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
      conversationList: [],
      userSignInfo: {
        sdkAppID: parseInt(import.meta.env.VITE_SDK_APP_ID),
        userSig: ''
      }
    }
  },
  actions: {
    /**
     * 获取tim签名秘钥
     * @param {Object} context
     * @param {String} conversationID
     */
     async getUserSig (context, userID) {
      await IMApi.getUserSig({ from_uid: userID }).then(res => {
        const { sign } = res.data[0]
        context.commit('setUserSig', sign)
      })
    },
    // 登录im
    async imLogin (userID) {
      if (this.state.isImLogin) return
      await context.dispatch('getUserSig', userID)
      await tim
        .login({
          userID: 'hospital_' + userID,
          userSig: context.state.userSignInfo.userSig
        })
        .then(() => {
          context.commit('toggleIsLogin', true)
        })
        .catch(imError => {
          Toast('登录失败：' + imError.message)
        })
    },
    /**
     * 更新会话列表
     * 调用时机：触发会话列表更新事件时。CONVERSATION_LIST_UPDATED
     * @param {Object} state
     * @param {Conversation[]} conversationList
     */
     updateConversationList(state, conversationList) {
      state.conversationList = conversationList
    }
  }
})
