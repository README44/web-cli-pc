<template>
  <Transition
    :name="duration === 0 && closeable === false ? '' : 'down'"
    @before-leave="beforeLeave"
    @after-leave="emit('destroy')"
  >
    <div v-show="visible" :id="id" class="olive-message" :style="style[type]">
      <div class="flex justify-between">
        <div class="flex items-center">
          <img :src="icons[type]" alt="" class="w-[20px] h-[20px]" />
          <div class="font-Bold text-[18px] leading-[25px] ml-[6px]">{{ title || titles[type] }}</div>
        </div>
        <div v-if="closeable">
          <img src="./icons/close.png" alt="" class="w-[20px] h-[20px] cursor-pointer select-none" @click="close" />
        </div>
      </div>
      <div v-if="!dangerouslyUseHTMLString" class="text leading-[22px] font-Regular mt-[6px]">
        {{ text }}
      </div>
      <div v-else class="text leading-[22px] font-Regular mt-[6px]" v-html="text"></div>
      <slot name="action"></slot>
    </div>
  </Transition>
</template>
<script setup name="OliveMessage">
import iconSuccess from './icons/success.png';
import iconError from './icons/error.png';
import iconWarning from './icons/warning.png';
import iconInfo from './icons/info.png';
const props = defineProps({
  duration: {
    type: Number,
    default: 3000
  },
  text: {
    type: String,
    default: ''
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  onClose: {
    type: Function,
    required: false
  },
  closeable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    validator(value) {
      return ['success', 'info', 'warning', 'error'].includes(value);
    },
    default: 'info'
  },
  action: {
    type: Function,
    default: null
  }
});
const titles = {
  warning: 'Warning!',
  success: 'Good news!',
  error: 'Error!',
  info: 'Information'
};
const icons = {
  warning: iconWarning,
  success: iconSuccess,
  error: iconError,
  info: iconInfo
};
// 定义一个对象，包含四种情况的样式，对象key就是类型字符串
const style = {
  warning: {
    icon: 'icon-warning',
    borderColor: '#BB7316'
  },
  error: {
    icon: 'icon-shanchu',
    borderColor: '#963632'
  },
  success: {
    icon: 'icon-queren2',
    borderColor: '#407346'
  },
  info: {
    icon: 'icon-queren2',
    borderColor: '#717E88'
  }
};
const emit = defineEmits(['destroy', 'close']);
const visible = ref(false);
const timerId = ref();
const startTimer = () => {
  if (props.duration > 0) {
    timerId.value = setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
};

const clearTimer = () => {
  if (timerId.value) {
    clearTimeout(timerId.value);
    timerId.value = undefined;
  }
};

const close = () => (visible.value = false);
const beforeLeave = () => {
  emit('close');
};
onBeforeMount(() => {
  clearTimer();
});

onMounted(() => {
  startTimer();
  visible.value = true;
});
defineExpose({
  visible,
  close
});
</script>
<style scoped lang="scss">
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
  &-leave-to {
    opacity: 0;
    transform: translate3d(0, -75px, 0);
  }
}
.olive-message {
  width: 100%;
  max-width: 600px;
  min-height: 85px;
  margin-top: 10px;
  padding: 0 25px;
  border-left: 6px;
  border-left-style: solid;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px 16px;
  box-sizing: border-box;
  box-shadow: 0px 6px 54px 0 rgba(#000000, 0.13);
  margin: 0 auto;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
<style lang="scss">
.olive-message-container {
  width: 1200px;
  min-height: 85px;
  position: relative;
  position: fixed;
  z-index: 9999;
  top: 238px;
  left: 50%;
  margin-left: -600px;
  display: none;
}
// 屏幕最小宽度小于1200时，宽度为90%
@media screen and (max-width: 1200px) {
  .olive-message-container {
    width: 90%;
    margin-left: -45%;
  }
}
</style>
