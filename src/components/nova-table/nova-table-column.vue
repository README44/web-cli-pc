<template>
  <!-- 如果有配置多级表头的数据，则递归该组件 -->
  <template v-if="col.children?.length">
    <el-table-column :label="col.label" :width="col.width" :align="col.align">
      <NovaTableColumn v-for="item in col.children" :key="item.prop" :col="item">
        <template v-for="slot in Object.keys($slots)" #[slot]="scope: Record<string, any>">
          <slot :name="slot" v-bind="scope" />
        </template>
      </NovaTableColumn>
      <template #header="{ column, $index }">
        <component :is="col.headerRender" v-if="col.headerRender" :column="column" :index="$index" />
        <slot v-else-if="col.headerSlot" :name="col.headerSlot" :column="column" :index="$index"></slot>
        <span v-else>{{ column.label }}</span>
      </template>
    </el-table-column>
  </template>
  <!-- 其他正常列 -->
  <el-table-column v-else v-bind="col">
    <!-- 自定义表头 -->
    <template #header="{ column, $index }">
      <component :is="col.headerRender" v-if="col.headerRender" :column="column" :index="$index" />
      <slot v-else-if="col.headerSlot" :name="col.headerSlot" :column="column" :index="$index"></slot>
      <span v-else>{{ column.label }}</span>
    </template>

    <template #default="{ row, $index }">
      <!---图片 START-->
      <el-image
        v-if="col.type === 'image'"
        preview-teleported
        :hide-on-click-modal="true"
        :preview-src-list="[row[col.prop!]]"
        :src="row[col.prop!]"
        fit="cover"
        class="w-9 h-9 rounded-lg"
      />
      <!---图片 END-->

      <!--- 格式化日期 START-->
      <template v-else-if="col.type === 'date'">
        {{ formatDate(row[col.prop!], col.dateFormat) }}
      </template>
      <!--- 格式化日期 END-->

      <!-- 如果传递按钮数组，就展示按钮组 START-->
      <el-space v-else-if="col.buttons?.length">
        <el-button
          v-for="(btn, index) in col.buttons"
          :key="index"
          :size="btn.size"
          :type="btn.type"
          @click="onAction(btn.command, { row, $index })"
        >
          {{ btn.name || '-' }}
        </el-button>
      </el-space>
      <!-- 如果传递按钮数组，就展示按钮组 END-->

      <!-- render函数 START -->
      <component :is="col.render" v-else-if="col.render" :row="row" :index="$index" />
      <!-- render函数 END -->

      <!-- formatter (START) -->
      <template v-else-if="col.formatter">
        <slot :name="col.prop" :row="row">{{ col.formatter(col.prop!) }}</slot>
      </template>
      <!-- formatter (START) -->

      <!-- 默认渲染 (START) -->
      <template v-else>
        <slot :name="col.prop" :row="row">{{ row[col.prop!] === 0 ? 0 : row[col.prop!] || '-' }}</slot>
      </template>
      <!-- 默认渲染 (END) -->
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/date';

defineProps<{ col: Table.Column<any> }>();

const emit = defineEmits(['command']);
// 按钮组事件
const onAction = (command: Table.Command, { row, $index }: { row: any; $index: number }) => {
  emit('command', command, row, $index);
};
</script>
