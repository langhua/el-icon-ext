[En](README_en.md)

# Element Plus 图标扩展 (el-icon-ext)

本模块基于[Element Plus Icons](https://github.com/element-plus/element-plus-icons)，对源码做了一些修改。使用步骤如下。

<br/>

### 使用方法

1. 安装pnpm:

   ```shell
   npm install pnpm -g
   ```

2. 安装node模块:

   ```shell
   pnpm install
   ```

3. 把svg文件添加到/original-svg目录中

4. /original-svg生成合格的svg文件，另存到/packages/svg目录中:

   ```shell
   pnpm optimize
   ```

5. 编译并把结果存到/packages/vue/dist目录中:

   ```shell
   pnpm build
   ```

6. 运行dev，检查svg图标文件在浏览器中显示正确:

   ```shell
   pnpm dev
   ```

7. 在自己的vue3项目中使用@langhua/el-icon-ext:

   1. 把/packages/vue/dist复制到自己项目中，比如/src/assets/@langhua/el-icon-ext

   2. 把@langhua/el-icon-ext配置到package.json中:

   ```json
     ...
     "dependencies": {
       ...
       "@langhua/el-icon-ext": "link:./src/assets/@langhua/el-icon-ext"
     },
     ...
   ```

   3. 在typescript中使用@langhua/el-icon-ext:

   ```ts
   import { Paste, FileHistory } from '@langhua/el-icon-ext'
   ...
   <Paste />
   <FileHistory />
   ```

   4. 通过yarn安装模块，yarn支持link @langhua/el-icon-ext到本地的用法:

   ```shell
   yarn install
   ```

   5. 运行app:

   ```shell
   yarn dev
   or
   npm run dev
   ```

<br/>

### 修改了的代码

1. SVGO:

   1. 添加了./svgo.config.cjs，用于更好地生成svg文件:

   ```js
   module.exports = {
     plugins: [
       // step 1: use preset-default
       {
         name: 'preset-default',
       },
       // step 2: remove 3 attributes of svg node
       {
         name: 'removeAttrs',
         params: {
           attrs: ['svg:width', 'svg:height', 'svg:class'],
         },
       },
       // step 3: set fill attribute of path node to currentColor
       {
         name: 'addPathFillCurrentColor',
         params: {},
         fn: (root, params) => {
           return {
             element: {
               enter: (node) => {
                 if (
                   node.name === 'path' &&
                   (!node.attributes['fill'] ||
                     node.attributes['fill'] !== 'currentColor')
                 ) {
                   node.attributes['fill'] = 'currentColor'
                 }
               },
             },
           }
         },
       },
     ],
   }
   ```

   2. 修改./packages/svg/package.json，使用./svgo.config.cjs作为配置文件:

   ```json
   "scripts": {
     "optimize": "svgo -f ../../original-svg -o . --config ../../svgo.config.cjs"
   },
   ```

   3. 把optimize添加到./package.json的scripts中:

   ```json
   "scripts": {
     ...
     "optimize": "pnpm run -C ./packages/svg optimize"
   },
   ```

   然后即可运行'pnpm optimize'。

2. @langhua/icons-svg:

   1. 搜索'@element-plus/icons-svg'并全部替换为'@langhua/icons-svg'.
   2. 删除./packages/svg目录下的所有svg文件
   3. 把自己的svg文件添加到/original-svg

3. @langhua/el-icon-ext:
   搜索'@element-plus/icons-vue'并全部替换为'@langhua/el-icon-ext'。

<br/>

### 参考资料

1. [Element Plus Icons源码](https://github.com/element-plus/element-plus-icons)
2. [阿里图片库IconFont](https://www.iconfont.cn/)
3. [Svgo源码](https://github.com/svg/svgo)
4. [Svgo文档](https://svgo.dev/docs/plugins/)

<br />

### 版权

[MIT](./LICENSE)版权
