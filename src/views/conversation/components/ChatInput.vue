<template>
  <div class="message-info-view__content--input">
    <div class='message-input' :class="{ 'disabled-style': false, 'draging-style': isDraging }" @drop="handleDropFile" >
      <!-- <AtPopup v-show="atPopup" @callback="(userId, name) => onAtPopupCallback(userId, name)" atUserNameInput={atUserNameInput} group_id={convId} /> -->
      <div class="message-input__feature-area">
        <EmojiPopup v-if="isEmojiPopup" callback={onEmojiPopupCallback} />
        <span
          v-for="({id, title}) in FEATURE_LIST[1]"
          :key="id"
          :class="['message-input__feature-area--icon', { 'is-active': activeFeature === id }, id]"
          @click="handleFeatureClick(id)"
          :title="title"
        />
      </div>
      <div class="message-input__text-area" @keyDown="handleKeyDown">
        <textarea
          ref="text-input"
          rows="4"
          resize="false"
          v-model="messageContent"
          @focus="focus = true"
          @blur="focus = false"
          @input="inputChange"
          @keydown.enter.exact.prevent="handleEnter"
          @keyup.ctrl.enter.prevent.exact="handleLine"
          @keydown.up.stop="handleUp"
          @keydown.down.stop="handleDown"
        >
        </textarea>
        <!-- <BraftEditor
          stripPastedStyles
          :disabled="isShutUpAll"
          :onChange="editorChange"
          :value="editorState"
          :media="{pasteImage:false}"
          ref="editorInstanceRef"
          :blockRendererFn="blockRendererFn"
          :keyBindingFn="keyBindingFn"
          :handleKeyCommand="handleKeyCommand"
          :contentStyle="{ height: '100%', fontSize: 14 }"
          :converts="{ blockExportFn }"
          :placeholder="placeHolderText"
          :draftProps="{ handlePastedFiles, handlePastedText, handleDroppedFiles: () => 'handled'}"
          :actions="[]"
        /> -->
      </div>
      <div class="message-input__button-area">
        <el-button type="primary" @click="handleSendMsg" :disabled="isAnalysizeVideo">发送</el-button>
      </div>
      <RecordPopup v-if="isRecordPopup" @send='handleRecordPopupCallback' @cancel="setRecordPopup(false)" />
  </div>
  </div>
</template>
<script setup>
import { ref } from "vue"

// const editorState = //ref(BraftEditor.createEditorState(null, { blockExportFn }))

const isDraging = ref(false)
const setDraging = (isDrag) => isDraging.value = isDrag

const handleDropFile = (e) => {
  const files = e.dataTransfer?.files || [];
  console.log({ files })
  setDraging(false)
  return 'handled'
}
function featureList () {
  const FEATURE_LIST_GROUP = [{
    id: 'face',
    title: '表情'
  },{
      id: 'photo',
      title: '发送图片'
  }, {
      id: 'file',
      title: '发送文件'
  }
  ,{
      id: 'phone',
      title: '通话'
  // }, {
  //     id: 'screenShot',
  //     title: '截图 (shift+option+c)'
  }]
  const FEATURE_LIST_C2C = [{
    id: 'face',
    title: '表情'
  },{
    id: 'photo',
    title: '发送图片'
  }, {
    id: 'file',
    title: '发送文件'
  }
  ,{
      id: 'phone',
      title: '通话'
  // }, {
  //     id: 'screenShot',
  //     title: '截图 (shift+option+c)'
  }]
  const FEATURE_LIST = {
      1: FEATURE_LIST_C2C, 2: FEATURE_LIST_GROUP
  }
  return FEATURE_LIST
}
const FEATURE_LIST = featureList()
</script>
<style lang="less" scoped>
.message-input {
  height: 100%;
  position: relative;

  &.disabled-style {
    pointer-events: none;
    opacity: 0.7;
  }

  &.draging-style {
    opacity: 0.7;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border: 1px dashed #666;
    }
  }

  &__feature-area {
    height: 30px;
    padding-left: 12px;
    padding-top: 12px;
    position: relative;

    &--icon {
      cursor: pointer;
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 28px;

      &.face {
        background-image: url("../imgs/face-message.svg");

        &.is-active {
          background-image: url("../imgs/face-message-active.svg");
        }
      }

      &.at {
        background-image: url("../imgs/at.svg");

        &.is-active {
          background-image: url("../imgs/at-active.svg");
        }
      }

      &.photo {
        background-image: url("../imgs/photo-message.svg");

        &.is-active {
          background-image: url("../imgs/photo-message-active.svg");
        }
      }

      &.file {
        background-image: url("../imgs/file-message.svg");

        &.is-active {
          background-image: url("../imgs/file-message-active.svg");
        }
      }

      &.voice {
        background-image: url("../imgs/voice-message.svg");

        &.is-active {
          background-image: url("../imgs/voice-message-active.svg");
        }
      }
      &.video {
        background-image: url("../imgs/video.svg");

        &.is-active {
          background-image: url("../imgs/video-active.svg");
        }
      }
      &.phone {
        background-image: url("../imgs/phone.svg");

        &.is-active {
          background-image: url("../imgs/phone-active.svg");
        }
      }

      &.more {
        background-image: url("../imgs/more.svg");
        &.is-active {
          background-image: url("../imgs/more-active.svg");
        }
      }
    }
  }

  &__text-area {
    height: calc(100% - 30px);
    textarea {
      font-size: 16px;
      width: 100%;
      box-sizing: box-sizing;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }

  &__button-area {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 1;
  }

  &__at-popup {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  &__emoji-popup {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  .bf-container .public-DraftEditor-content {
    padding-top: 0;
  }
}
</style>