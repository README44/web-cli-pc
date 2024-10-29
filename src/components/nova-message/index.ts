import { createVNode, render, isVNode } from 'vue';
import MessageContructor from './nova-message.vue';
let seed = 1;
const instances: any = [];
const messageTypes = ['success', 'info', 'warning', 'error'];
// 准备dom容器
let appendTo: any = document.querySelector('.olive-message-container');
if (!appendTo) {
  appendTo = document.createElement('div');
  // 添加类名
  appendTo.setAttribute('class', 'olive-message-container');
  // 添加到body上
  document.body.appendChild(appendTo);
}
const message: any = function (options: any) {
  if (typeof options === 'string' || isVNode(options)) {
    options = { text: options };
  }
  // Check if the message text is the same as the title of existing messages
  const duplicateMessage = instances.find((vm: any) => ['title', 'text', 'type'].every(prop => vm.props[prop] === options[prop]));
  if (duplicateMessage) {
    return false;
  }
  // 更改message-container位置
  appendTo.style.top = options.top ? options.top + (typeof options.top === 'number' ? 'px' : '') : '100px';
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const props = {
    ...options,
    id,
    onClose: () => {
      close(id, userOnClose);
    }
  };

  const messageContent = props.message;
  const vm: any = createVNode(
    MessageContructor,
    props,
    typeof messageContent === 'function'
      ? { default: messageContent, action: () => props.action && props.action({ close: props.onClose }) }
      : isVNode(messageContent)
        ? { default: () => messageContent, action: () => props.action && props.action({ close: props.onClose }) }
        : { action: () => props.action && props.action({ close: props.onClose }) }
  );
  const container = document.createElement('div');
  vm.props.onDestroy = () => {
    const destroyMessageDom = document.querySelector(`#${id}`);
    destroyMessageDom && appendTo.removeChild(destroyMessageDom);
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

messageTypes.forEach(type => {
  message[type] = (options = {}, appContext: any) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = { text: options };
    }
    message({ ...options, type }, appContext);
  };
});

function close(id: any, userClose: any) {
  const idx = instances.findIndex((vm: any) => vm.props.id === id);
  if (idx === -1) return;
  const vm = instances[idx];
  userClose && userClose(vm);
  instances.splice(idx, 1);
  const destroyMessageDom = document.querySelector(`#${id}`);
  appendTo.removeChild(destroyMessageDom);
  if (instances.length === 0) {
    appendTo.style.display = 'none';
  }
}

export function closeAll() {
  console.log('CLOSEALL');
  appendTo.parentNode.removeChild(appendTo);
}

message.closeAll = closeAll;
export default message;
