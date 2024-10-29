<template>
  <Transition name="down" @before-leave="beforeLeave" @after-leave="emit('destroy')">
    <div v-show="visible" :id="id" class="olive-toast" :style="style[type]">
      <div class="flex justify-between">
        <div class="flex items-center">
          <div class="font-Bold text-[18px] leading-[25px] text-[#fff]">{{ title || titles[type] }}</div>
        </div>
      </div>
      <div v-if="!dangerouslyUseHTMLString" class="text leading-[22px] font-Regular mt-[6px] text-[#fff]">
        {{ text }}
      </div>
      <div v-else class="text leading-[22px] font-Regular mt-[6px] text-[#fff]" v-html="text"></div>
      <slot name="action"></slot>
    </div>
  </Transition>
</template>
<script setup name="OliveToast">
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
  warning: 'Warning',
  success: 'Success',
  error: 'Error',
  info: 'Information'
};
// 定义一个对象，包含四种情况的样式，对象key就是类型字符串
const style = {
  warning: {
    backgroundColor: '#BB7316'
  },
  error: {
    backgroundColor: '#963632'
  },
  success: {
    backgroundColor: '#407346'
  },
  info: {
    backgroundColor: '#5d5d5d'
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
.olive-toast {
  width: 800px;
  min-height: 96px;
  line-height: 50px;
  margin-top: 10px;
  padding: 0 25px;
  color: #ffffff;
  border-radius: 8px;
  padding: 10px 16px;
  box-sizing: border-box;
  box-shadow: 0px 6px 54px 0 rgba(#000000, 0.13);
  .text {
    vertical-align: middle;
  }
}
</style>
<style lang="scss">
.olive-toast-container {
  width: 800px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -400px;
  top: 25px;
  display: none;
}
// 屏幕最小宽度小于1200时，宽度为90%
@media screen and (max-width: 800px) {
  .olive-toast-container {
    width: 90%;
    margin-left: -45%;
  }
}
</style>
