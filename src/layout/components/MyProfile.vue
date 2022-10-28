<template>
  <el-popover
    :width="300"
    trigger="click"
    popper-class="profile-popup"
  >
    <template #reference>
      <el-avatar class="profile-popup__avatar" src="@/assets/logo.png" />
    </template>
    <template #default>
      <div class="userinfo-avatar--panel" ref='refPopup'>
        <div class="card-content">
          <div class="main-info">
            <div class="info-item">
              <Avatar nickName={nickName} userID={userId} url={faceUrl} />
              <div class="nickname">nickName || userId</div>
            </div>
          </div>
          <div class="info-bar">
            <span class="info-key">ID</span>
            <span class="info-val nickname">userId</span>
          </div>
          <div class="info-bar">
            <span class="info-key">昵称</span>
            <span class="info-val">{nickName || '未设置'}</span>
          </div>
          <div class="info-bar">
            <span class="info-key">性别</span>
            <span class="info-val">{getGender(gender)}</span>
          </div>
          <div class="info-bar">
            <span class="info-key">签名</span>
            <span class="info-val">{signature || '未设置'}</span>
          </div>
          <div class="info-bar">
            <ElButton
              type="primary"
              @click="sendMessage"
              style="width: 100%"
            >
              发消息
            </ElButton>
          </div>
        </div>
    </div>
    </template>
  </el-popover>
</template>
<script setup>

const getGender = (gender) => {
  const arr = ['未知', '男', '女']
  return arr[Number(gender)] || arr[0]
}
// 发送消息
const sendMessage = async () => {
  const data = await timRenderInstance.TIMProfileGetUserProfileList({
    json_get_user_profile_list_param: {
      friendship_getprofilelist_param_identifier_array: [userId]
    }
  })
  const { code, json_param } = data.data;
  if (code === 0) {
    sendMsg({
      profile: JSON.parse(json_param)[0],
      convType: 1
    })
    callback()
  }
}

</script>
<style lang="less" scoped>
.profile-popup {
  box-shadow: rgba(14, 18, 22, .035) 0px 10px 38px -10px, rgb(14, 18, 22, 0.2) 0px 10px 20px -15px;
  padding: 20px;
  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 2px;
    -webkit-app-region: no-drag;
  }
}
.userinfo-avatar--panel {
  width: 274px;
  height: auto;
  background-color: #fff;
  z-index: 10000;
  border: 1px solid #d1d1d1;
  user-select:none;
  .card-content {
    background: #FFF;
    min-width: 250px;
    border-radius: 4px;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    word-break: break-all;

    .main-info {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #F2EFEF;
      padding-bottom: 15px;
      justify-content: space-between;
      .circle-name {
        color: #fff;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #5cadff;
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .info-item{
      display: flex;
    }
    .nickname {
      overflow: hidden;
      height: 40px;
      line-height: 40px;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 15px;
    }

    .info-bar {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;

      .info-key {
        color: #9E9E9E;
        line-height: 40px;
      }

      .info-val {
        color: #000000;
        margin-left: 20px;
        flex: 1;
        line-height: 40px;
        text-align: right;
      }
    }
  }
}
</style>