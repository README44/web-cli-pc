import { createVNode, render, isVNode } from 'vue';
import ToastContructor from './nova-toast.vue';
let seed = 1;
const instances: any = [];
const toastTypes = ['success', 'info', 'warning', 'error'];
// 准备dom容器
let appendTo: any = document.querySelector('.olive-toast-container');
if (!appendTo) {
  appendTo = document.createElement('div');
  // 添加类名
  appendTo.setAttribute('class', 'olive-toast-container');
  // 添加到body上
  document.body.appendChild(appendTo);
}
const toast: any = function (options: any) {
  if (typeof options === 'string' || isVNode(options)) {
    options = { text: options };
  }
  // Check if the message text is the same as the title of existing messages
  const duplicateMessage = instances.find((vm: any) => ['title', 'text', 'type'].every(prop => vm.props[prop] === options[prop]));
  if (duplicateMessage) {
    return false;
  }
  const id = `toast_${seed++}`;
  const userOnClose = options.onClose;

  const props = {
    ...options,
    id,
    onClose: () => {
      close(id, userOnClose);
    }
  };

  const toastContent = props.toast;
  const vm: any = createVNode(
    ToastContructor,
    props,
    typeof toastContent === 'function'
      ? { default: toastContent, action: () => props.action && props.action() }
      : isVNode(toastContent)
        ? { default: () => toastContent, action: () => props.action && props.action() }
        : { action: () => props.action && props.action() }
  );
  const container = document.createElement('div');
  vm.props.onDestroy = () => {
    const destroyMessageDom: any = document.querySelector(`#${id}`);
    appendTo.removeChild(destroyMessageDom);
    if (instances.length === 0) {
      appendTo.style.display = 'none';
    }
  };
  render(vm, container);
  appendTo.style.display = 'block';
  appendTo.appendChild(container.firstElementChild);
  instances.push(vm);
  return {
    close: () => (vm.component.proxy.visible = false)
  };
};

toastTypes.forEach(type => {
  toast[type] = (options = {}, appContext: any) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = { text: options };
    }
    toast({ ...options, type }, appContext);
  };
});

function close(id: any, userClose: any) {
  const idx = instances.findIndex((vm: any) => vm.props.id === id);
  if (idx === -1) return;
  const vm = instances[idx];
  userClose && userClose(vm);
  instances.splice(idx, 1);
}

export function closeAll() {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].component;
    instance?.proxy.close();
  }
}

toast.closeAll = closeAll;
export default toast;
