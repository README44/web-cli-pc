<template>
  <el-container class="nova-table">
    <el-header v-if="_options.showQuery" class="h-auto p-0">
      <div class="c-#1B1B1B font-size-18px pb-16px font-700">Search</div>
      <el-form id="queryForm" class="nova-table-query" label-position="top" :inline="true" :model="queryForm">
        <!-- <div class="flex-grow"> -->
        <slot name="nova-query-content"></slot>
        <!-- </div> -->
        <el-form-item>
          <el-button
            :loading="loading"
            class="nova-button-second font-size-14px px-24px py-10px rounded-30px"
            @click="handleQuery"
          >
            Search
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="flex flex-col wh-full p-0" :style="{ padding: _options.tableWarpPadding }">
      <!-- 表格标题 -->
      <div v-if="_options.showTableTitle" class="c-#1B1B1B font-size-18px pb-16px font-700">Search results</div>
      <!-- 表格内部功能区 -->
      <div v-if="$slots['nova-table-func']" class="mb-16px">
        <slot name="nova-table-func"></slot>
      </div>
      <!-- 表格 -->
      <div class="flex-1 overflow-hidden">
        <el-table
          ref="tableRef"
          v-loading="loading"
          :data="data"
          v-bind="_options"
          class="wh-full"
          @selection-change="onSelectionChange"
          @row-click="onRowClick"
          @cell-click="onCellClick"
          @sort-change="onSortChange"
        >
          <template v-for="(col, _index) in columns" :key="_index">
            <el-table-column
              v-if="col.type === 'index' || col.type === 'selection' || col.type === 'expand'"
              :index="indexMethod"
              v-bind="col"
            >
              <!-- 当type等于expand时， 配置通过h函数渲染、txs语法或者插槽自定义内容 -->
              <template #default="{ row, $index }">
                <!-- render函数 (START) : 使用内置的component组件可以支持h函数渲染和txs语法 -->
                <component :is="col.render" v-if="col.render" :row="row" :index="$index" />
                <!-- render函数 (END) -->
                <slot v-else-if="col.formatter" :name="col.prop" :row="row">{{ col.formatter(row) }}</slot>
                <slot v-else-if="col.prop" :name="col.prop" :row="row">{{ row[col.prop!] || '-' }}</slot>
              </template>
            </el-table-column>
            <NovaTableColumn v-else :col="col" @command="onAction" />
          </template>
        </el-table>
      </div>
      <!-- 底部 -->
      <div
        v-if="_options.showPagination"
        class="w-full flex items-center pt-[var(--el-main-padding)]"
        :class="$slots['nova-footer-func'] ? 'justify-between' : 'justify-end'"
      >
        <div v-if="$slots['nova-footer-func']">
          <!-- 插槽有内容时显示 -->
          <slot name="nova-footer-func"></slot>
        </div>
        <el-pagination v-bind="_paginationConfig" @size-change="pageSizeChange" @current-change="currentPageChange" />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="tsx" setup>
import { ElTable } from 'element-plus';
import { cloneDeep, debounce } from 'lodash-es';
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
export type SortParams<T> = {
  column: TableColumnCtx<T | any>;
  prop: string;
  order: Table.Order;
};
interface StTable {
  columns: Table.Column<any>[];
  data: Array<object>;
  filters?: Array<any>;
  options?: Table.Options;
  loading?: Boolean;
  queryForm?: Table.QueryForm;
}
const props = defineProps<StTable>();
const _options: ComputedRef<Table.Options> = computed(() => {
  const option = {
    stripe: false,
    headTitle: '',
    tooltipEffect: 'dark',
    showPagination: true,
    showQuery: true,
    showTableTitle: true,
    tableWarpPadding: null
  };
  return Object.assign(option, props?.options);
});

// 查询条件
const defaultQuery = cloneDeep(props.queryForm) || {};
const queryForm = computed({
  get() {
    return props.queryForm;
  },
  set(newVal) {
    return emit('update:queryForm', newVal);
  }
});
// 表格
const tableRef = ref<InstanceType<typeof ElTable>>();
// 分页
const _paginationConfig = computed(() => {
  const config = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50, 100],
    layout: 'total, prev, pager, next, sizes, jumper'
  };
  return Object.assign(config, _options.value.paginationConfig);
});
const indexMethod = (index: number) => {
  const tabIndex = index + (_paginationConfig.value.currentPage - 1) * _paginationConfig.value.pageSize + 1;
  return tabIndex;
};
// 切换pageSize
const pageSizeChange = (pageSize: number) => {
  emit('pagination-change', 1, pageSize);
};
// 切换currentPage
const currentPageChange = (currentPage: number) => {
  emit('pagination-change', currentPage, _paginationConfig.value.pageSize);
};
// 多选事件
const onSelectionChange = (val: any) => {
  emit('selection-change', val);
};
// 当某一行被点击时会触发该事件
const onRowClick = (row: any, column: any, event: MouseEvent) => {
  emit('row-click', row, column, event);
};
// 当某个单元格被点击时会触发该事件
const onCellClick = (row: any, column: any, cell: any, event: MouseEvent) => {
  emit('cell-click', row, column, cell, event);
};
// 按钮组件事件
const onAction = (command: Table.Command, row: any, index: number) => {
  emit('command', command, row, index);
};
/**
 *  当表格的排序条件发生变化的时候会触发该事件
 * 在列中设置 sortable 属性即可实现以该列为基准的排序， 接受一个 Boolean，默认为 false。
 * 可以通过 Table 的 default-sort 属性设置默认的排序列和排序顺序。
 * 如果需要后端排序，需将 sortable 设置为 custom，同时在 Table 上监听 sort-change 事件，
 * 在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。
 */
const onSortChange = ({ column, prop, order }: SortParams<any>) => {
  emit('sort-change', { column, prop, order });
};
// 查询
const handleQuery = debounce(() => {
  // queryForm.value = cloneDeep(defaultQuery);
  // tableRef.value!.clearSelection();
  // tableRef.value!.clearSort();
  emit('on-query');
}, 300);

const emit = defineEmits([
  'selection-change', // 当选择项发生变化时会触发该事件
  'row-click', // 当某一行被点击时会触发该事件
  'cell-click', // 当某个单元格被点击时会触发该事件
  'command', // 按钮组事件
  'size-change', // pageSize事件
  'current-change', // currentPage按钮组事件
  'pagination-change', // currentPage或者pageSize改变触发
  'sort-change', // 列排序发生改变触发
  'on-query', // 查询
  'on-reset', // 重置
  'update:queryForm' // queryForm更新
]);
defineExpose({ queryForm: queryForm.value });
</script>

<style lang="scss" scoped>
:root {
  --nova-table-bg-color: #fafafa;
}
.nova-table {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  .nova-table-query {
    display: flex;
    align-items: end;
    :deep(.el-form-item) {
      width: 240px;
    }
    :deep(.el-form-item:last-child) {
      margin-right: 0;
      width: 89px;
    }
  }
}
</style>
