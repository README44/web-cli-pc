<template>
  <nova-page>
    <template #container>
      <!-- 首页 -->
      <nova-table :data="tableData" :columns="tableColumns" :options="tableOptions"></nova-table>
    </template>
  </nova-page>
</template>

<script lang="ts" setup>
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]);
const tableColumns = ref<Table.Column<any>[]>([
  {
    label: 'date',
    prop: 'date',
    minWidth: 120
  },
  {
    label: 'name',
    prop: 'name',
    minWidth: 120
  },
  {
    label: 'address',
    prop: 'address',
    minWidth: 200
  }
]);
const tableOptions = reactive({
  paginationConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20
  }
});
</script>

<route lang="yaml">
meta:
  title: 首页
  isAffix: true
</route>
