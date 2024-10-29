<template>
  <el-button v-if="showBtn" :disabled="disabled" class="el-button--gray ma-16px" @click="open()">
    {{ btnText }}
  </el-button>
  <div class="dialog-nomal text-left">
    <el-dialog
      v-model="dialogVisible"
      modal-class="modal"
      :show-close="false"
      :title="title"
      :align-center="true"
      lock-scroll
      :height="height"
      :width="width"
      draggable
    >
      <div v-if="!title" class="head">
        <slot name="head"></slot>
      </div>
      <div class="content" :style="{ height: height }"><slot name="content"></slot></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="showCancel" class="el-button--primary w-120px rounded-48px" @click="close()">{{
            cancelText
          }}</el-button>
          <el-button v-if="showOk" class="el-button--primary w-120px rounded-48px" @click="sure()">{{ okText }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose, defineProps, defineEmits } from 'vue';
const Emit = defineEmits(['submit']);
defineProps({
  // 有title的时候展示title没有的时候展示自定义
  title: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: 'body'
  },
  //是否展示按钮
  showBtn: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  btnText: {
    type: String,
    default: 'Edit'
  },
  width: {
    type: String,
    default: '70%'
  },
  height: {
    type: String,
    default: '368px'
  },
  showOk: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  okText: {
    type: String,
    default: 'Save'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
});
const dialogVisible = ref(false);

const open = () => {
  dialogVisible.value = true;
};
//  确认
const sure = () => {
  Emit('submit');
};
const close = () => {
  dialogVisible.value = false;
};
defineExpose({ dialogVisible });
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  background-color: #fafbf9;
  border-radius: 24px;
  padding: 16px 32px;
  a {
    color: #0a84ff !important;
    display: inline-block;
    overflow: hidden;
    padding: 0;
    text-decoration: none;
    margin-top: 8px;
  }
}
:deep(.el-dialog__title) {
  font-size: 16px;
  font-weight: bold;
}
// :deep(.el-button) {
//   background-color: #9fa58e;
//   width: 128px;
//   border-radius: 16px;
//   color: white;
//   outline: none;
// }
:deep(.el-dialog__header) {
  /* padding: 24px 23px; */
  padding: 24px 0 14px 16px;
  margin: 0;
}
// :deep(.el-button):active {
//   outline: none;
//   border: none;
// }

.dialog-footer {
  display: inline-block;
  margin: 16px;
}
.dialog-nomal {
  --el-menu-active-color {
    color: white !important;
  }
  .nova-button-primary.nova-button-default {
    border-radius: 24px;
  }
  .modal {
    background: #ebede6 0.1;
    z-index: 111111111111;
  }
  .el-dialog__header {
    border-bottom: none !important;
  }
}
.content {
  background-color: white;
  height: 196px;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.2);
}
</style>
