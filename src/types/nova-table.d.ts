import type { TableProps, TableColumnCtx } from 'element-plus';
declare global {
  /** Table */
  declare namespace Table {
    type Type = 'selection' | 'index' | 'expand' | 'image' | 'date';
    type Size = 'large' | 'default' | 'small';
    type Align = 'center' | 'left' | 'right';
    type Command = string | number;
    type DateFormat =
      | 'YYYY-MM-DD'
      | 'YYYY-MM-DD HH:mm:ss'
      | 'YYYY-MM-DD HH:mm'
      | 'YYYY-MM'
      | 'DD-MMM-YYYY'
      | 'DD-MMM-YYYY hh:mm:ss A';
    type Fixed = true | 'left' | 'right';
    type Order = 'ascending' | 'descending';

    interface ButtonItem {
      name: string;
      command: Command;
      size?: Size;
      type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    }

    interface Column<T> {
      type?: Type;
      prop?: string;
      label?: string;
      fixed?: Fixed;
      width?: string | number;
      minWidth?: string | number;
      align?: Align;
      dateFormat?: DateFormat; // 显示在页面中的日期格式，简单列举了几种格式， 可自行配置
      showOverflowTooltip?: boolean;
      buttons?: ButtonItem[];
      formatter?: (scope: any) => void;
      sortable?: boolean | 'custom'; // 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
      headerRender?: ({ column, index }) => VNodeChild; // 渲染函数，渲染列表头
      headerSlot?: string; // 自定义表头插槽名字
      render?: (row?: T | any, index?: number) => VNodeChild; // 渲染函数，渲染这一列的每一行的单元格
      children?: Column[];
    }

    interface Options<T = any> extends Partial<TableProps<T>> {
      showTableTitle?: boolean;
      tableWarpPadding?: any;
      height?: string | number;
      stripe?: boolean;
      maxHeight?: string | number; // Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
      size?: Size; // Table 的尺寸
      tooltipEffect?: 'dark' | 'light'; // tooltip effect 属性
      headTitle?: string;
      showAside?: boolean;
      showPagination?: boolean;
      showQuery?: boolean;
      paginationConfig?: Pagination; // 分页器配置项，详情见下方 paginationConfig 属性,
      rowStyle?: ({ row, rowIndex }) => stirng | object; // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
      headerCellStyle?: import('vue').CSSProperties;
      aside?: Array; // 侧边数据
    }

    interface Pagination {
      total?: number; // 总条目数
      currentPage: number; // 当前页数，支持 v-model 双向绑定
      pageSize: number; // 每页显示条目个数，支持 v-model 双向绑定
      pageSizes?: number[]; // 每页显示个数选择器的选项设置
      layout?: string; // 组件布局，子组件名用逗号分隔
      background?: boolean; // 是否为分页按钮添加背景色
    }
    interface QueryForm {
      [prop: string | number | symbol]: any;
    }

    interface QueryOptions {
      showMoreQuery: boolean; // 是否展开
      isMoreQuery: boolean; // 是否还有更多查询条件未展示
      height: string; // 组件高度
      overflow: 'hidden' | 'visible';
    }
  }
}
