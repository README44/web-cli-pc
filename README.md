# web-cli-pc

## Language

- [English](#english)
- [中文](#中文)

## English

### Project Structure

- **Version**: 1.0.0
- **Type**: Module
- **Private**: Yes

### Technology Stack

- Vue 3.5, Vite 5, pnpm, ESBuild - super fast!
- TypeScript, of course
- State management using Pinia
- File-system-based routing with vite-plugin-pages
- Automatic component loading with unplugin-vue-components
- Layout system with vite-plugin-vue-layouts
- Direct use of Composition API without imports using unplugin-auto-import
- UnoCSS, a high-performance and highly flexible instant atomic CSS engine
- Using the new `<script setup>` syntax
- Dart Sass for CSS preprocessing
- ESLint for static code analysis to quickly find issues
- Prettier for prettier code
- PlopJs for more efficient development
- Node.js + Nginx for web services
- Lightweight, portable Docker application
- Jenkins for automated deployment

### Scripts

Here are the available NPM scripts:

- `dev`: Start the development server
- `uat`: Start the UAT environment
- `prod`: Start the production environment
- `build`: Build the production version
- `build:dev`: Build the development version
- `build:prod`: Build the production version
- `build:uat`: Build the UAT version
- `build:docker`: Build the Docker image
- `preview`: Preview the built application
- `lint`: Run ESLint checks
- `lint:prettier`: Run Prettier formatting
- `lint-staged`: Run lint-staged checks
- `prepare`: Install Husky
- `release`: Version update

### Dependencies

#### Main Dependencies

- `@element-plus/icons-vue`: Icon library
- `axios`: HTTP client
- `dayjs`: Date manipulation library
- `echarts`: Data visualization library
- `element-plus`: UI framework
- `pinia`: State management
- `vue-router`: Routing management

#### Development Dependencies

- `eslint`: Code checking tool
- `prettier`: Code formatting tool
- `husky`: Git hooks tool

### Environment Requirements

- Node.js: ^18.18.0 || ^20.9.0 || >=21.1.0
- pnpm: >=9.0.0

### Getting Started

1. Clone the project

    ```bash
    git clone <your project link>
    cd web-cli-pc
    ```

2. Install dependencies

    ```bash
    pnpm install
    ```

3. Start the development server

    ```bash
    pnpm dev
    ```

4. Access <http://localhost:3000>

## 中文

### 项目结构

- **版本**: 1.0.0
- **类型**: 模块
- **私有**: 是

### 技术栈

- Vue 3.5, Vite 5, pnpm, ESBuild - 就是快！
- TypeScript, 当然
- 使用 Pinia 的状态管理
- 以文件系统为基础的路由，vite-plugin-pages
- unplugin-vue-components，自动加载组件
- vite-plugin-vue-layouts，布局系统
- unplugin-auto-import，直接使用 Composition API 无需引入
- UnoCSS，高性能且极具灵活性的即时原子化 CSS 引擎
- 使用新的 `<script setup> 语法`
- dart-sass，css 预处理
- ESLint，静态地分析你的代码以快速发现问题
- 使用 Prettier 让代码更漂亮
- 使用 PlopJs 让开发变得更高效
- nodejs+nginx提供web服务
- 轻量级、可移植的docker应用
- Jenkins自动部署

### 脚本

以下是可用的 NPM 脚本：

- `dev`: 启动开发服务器
- `uat`: 启动 UAT 环境
- `prod`: 启动生产环境
- `build`: 构建生产版本
- `build:dev`: 构建开发版本
- `build:prod`: 构建生产版本
- `build:uat`: 构建 UAT 版本
- `build:docker`: 构建 Docker 镜像
- `preview`: 预览构建后的应用
- `lint`: 运行 ESLint 检查
- `lint:prettier`: 运行 Prettier 格式化
- `lint-staged`: 运行 lint-staged 检查
- `prepare`: 安装 Husky
- `release`: 版本更新

### 依赖

#### 主要依赖

- `@element-plus/icons-vue`: 图标库
- `axios`: HTTP 客户端
- `dayjs`: 日期处理库
- `echarts`: 数据可视化库
- `element-plus`: UI 框架
- `pinia`: 状态管理
- `vue-router`: 路由管理

#### 开发依赖

- `eslint`: 代码检查工具
- `prettier`: 代码格式化工具
- `husky`: Git hooks 工具

### 环境要求

- Node.js: ^18.18.0 || ^20.9.0 || >=21.1.0
- pnpm: >=9.0.0

### 如何开始

1. 克隆项目

   ```bash
   git clone <你的项目链接>
   cd web-cli-pc
   ```

2. 安装依赖

    ```bash
    pnpm install
    ```

3. 启动开发服务器

    ```bash
    pnpm dev
    ```

4. 访问 <http://localhost:3000>
