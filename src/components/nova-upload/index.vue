<template>
  <template v-if="type === 'default'">
    <el-upload
      :file-list="fileList"
      class="upload-demo"
      :action="APP_CONFIG.API_URL + '/common/upload'"
      multiple
      :limit="limit"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-exceed="handleExceed"
      :before-upload="handleBeforeUpload"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
      </template>
    </el-upload>
  </template>
  <!-- 带上传图标的上传样式 -->
  <template v-if="type === 'upload-file'">
    <el-upload
      ref="UploadRef"
      v-loading="detailLoading"
      multiple
      :file-list="fileList"
      :action="APP_CONFIG.API_URL + '/file/uploadFile'"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      class="upload-file"
    >
      <el-button
        type="primary"
        plain
        class="w-100% min-w430px h-80px bg-#F0F4EC font-size-16px font-normal color-#1B1B1B rounded-18px border-dashed border-1px border-#929584 upload-file-btn"
      >
        <nova-icon name="upload" class="mr-8px" size="20px"></nova-icon>{{ buttonName }}
      </el-button>
      <template v-if="isRefer" #tip>
        <div class="el-upload__tip">{{ refer }}</div>
      </template>
    </el-upload>
  </template>
  <template v-else-if="type === 'avatar'">
    <el-upload
      ref="UploadRef"
      :action="APP_CONFIG.API_URL + '/committee/upload/logo'"
      :on-success="handleSuccess"
      accept="image/png,image/jpeg"
      :headers="headers"
      :multiple="false"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
    >
      <el-image v-if="imageUrl" class="w-130px h-130px rounded-8px" :src="imageUrl" fit="cover"></el-image>
      <el-button
        v-else
        v-loading="loading"
        class="w-130px h-130px rounded-8px bg-#FAFAFA border-width-1px border-#EDEDED font-size-13px fw-500 text-#BCBCBC"
      >
        <div>
          <nova-icon name="camera" class="color-#6A6A6A" size="24px"></nova-icon>
          <div>Add picture</div>
        </div>
      </el-button>
      <template v-if="showLabel" #trigger>
        <el-button type="primary" link>Upload Committee Logo</el-button>
      </template>
    </el-upload>
  </template>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import type { UploadProps } from 'element-plus';
import { APP_CONFIG } from '@/config';
import { useUserStore } from '@/stores/modules/user';
import NovaMessage from '@/components/nova-message';
const detailLoading = ref(false);
const props = defineProps({
  // 文件上传类型
  type: { type: String, default: 'default' },
  // avatar模式图片地址
  avatarUrl: {
    type: String,
    default: ''
  },
  //按钮名称
  buttonName: {
    type: String,
    default: 'Click to upload'
  },
  //上传文件描述
  refer: {
    type: String,
    default: 'jpg/png files with a size less than 500KB.'
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  isRefer: {
    type: Boolean,
    default: true
  },
  // fileList
  fileList: {
    type: Array,
    default: () => []
  },
  // 文件类型
  fileType: {
    type: Array,
    default: () => []
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 10
  },
  // 数量限制
  limit: {
    type: Number,
    default: 5
  }
});

const imageUrl = ref(props.avatarUrl);
const number = ref(0);
const loading = ref<boolean>(false);
const headers = {
  Authorization: useUserStore().token
};
const UploadRef = ref();

const fileTypeValue = computed(() => {
  let videoFileTypes = ['mp4', 'mov', 'wmv', 'mkv'];
  let defaultFileTypes = ['png', 'jpg', 'jpeg', 'doc', 'xls', 'ppt', 'txt', 'pdf', 'docx', 'xlsx', 'pptx'];
  if (props.type === 'video') {
    return props.fileType.length > 0 ? props.fileType : videoFileTypes;
  } else {
    return props.fileType.length > 0 ? props.fileType : defaultFileTypes;
  }
});
// 上传前校检格式和大小
const handleBeforeUpload = (file: File) => {
  detailLoading.value = true;
  // 校检文件类型
  if (fileTypeValue.value.length) {
    const fileName = file.name.split('.');
    const fileExt = fileName[fileName.length - 1];
    const isTypeOk = fileTypeValue.value.indexOf(fileExt) >= 0;
    if (!isTypeOk) {
      NovaMessage.waring(`Must be ${fileTypeValue.value.join('/')} format!`);
      detailLoading.value = false;
      return false;
    }
  }
  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    if (!isLt) {
      NovaMessage.waring(`Size can not exceed ${props.fileSize} MB!`);
      return false;
    }
  }
  number.value++;
  loading.value = true;
  return true;
};
// 上传成功
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  detailLoading.value = false;
  if (response.code === 200) {
    if (props.type == 'avatar') {
      imageUrl.value = response.data.url || URL.createObjectURL(uploadFile.raw!);
    } else if (props.type == 'upload-file') {
      UploadRef.value.clearFiles();
      delete response.data.bucketName;
    }
    emits('upload-success', response.data);
    emits('update:avatarUrl', response.data || URL.createObjectURL(uploadFile.raw!));
  } else {
    number.value--;
    NovaMessage.error(response.msg || 'Response Error');
    UploadRef.value.handleRemove(uploadFile);
  }
  loading.value = false;
};
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};
const handlePreview: UploadProps['onPreview'] = uploadFile => {
  console.log(uploadFile);
};
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  detailLoading.value = false;
  NovaMessage.warning(
    `The limit is ${props.limit}, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`
  );
};
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => {
      detailLoading.value = false;
      true;
    },
    () => {
      detailLoading.value = false;
      false;
    }
  );
};

const emits = defineEmits(['update:avatarUrl', 'upload-success']);
</script>

<style lang="scss" scoped>
.upload-file-btn:hover {
  color: #1b1b1b;
  background-color: #f0f4ec;
}
</style>
