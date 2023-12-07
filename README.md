# Element Plus Icons Extension (el-icon-ext)

This repository is forked from [Element Plus Icons](https://github.com/element-plus/element-plus-icons). The following steps are what I did.

<br/>

### Steps

1. install pnpm:

   ```shell
   npm install pnpm -g
   ```

2. install node modules:

   ```shell
   pnpm install
   ```

3. add svg files to /original-svg

4. generate qualified svg files from /original-svg into /packages/svg:

   ```shell
   pnpm optimize
   ```

5. build dist:

   ```shell
   pnpm build
   ```

6. run dev and check whether the svg icon files are right in web browser:

   ```shell
   pnpm dev
   ```

7. use @langhua/el-icon-ext in your vue3 project:

   1. copy packages/vue/dist into /src/assets/@langhua/el-icon-ext

   2. add @langhua/el-icon-ext in package.json:

   ```json
     ...
     "dependencies": {
       ...
       "@langhua/el-icon-ext": "link:./src/assets/@langhua/el-icon-ext"
     },
     ...
   ```

   3. use @langhua/el-icon-ext in typescript:

   ```ts
   import { Paste, FileHistory } from '@langhua/el-icon-ext'
   ...
   <Paste />
   <FileHistory />
   ```

   4. install modules by yarn as yarn supports link @langhua/el-icon-ext to local directory:

   ```shell
   yarn install
   ```

   5. run app:

   ```shell
   yarn dev
   or
   npm run dev
   ```

<br/>

### Code changes

1. SVGO:

   1. add ./svgo.config.cjs:

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

   2. change optimize in ./packages/svg/package.json to use ./svgo.config.cjs:

   ```json
   "scripts": {
     "optimize": "svgo -f ../../original-svg -o . --config ../../svgo.config.cjs"
   },
   ```

   3. add optimize to scripts in ./package.json:

   ```json
   "scripts": {
     ...
     "optimize": "pnpm run -C ./packages/svg optimize"
   },
   ```

   Then you can run 'pnpm optimize'.

2. @langhua/icons-svg:

   1. change all '@element-plus/icons-svg' to '@langhua/icons-svg'.
   2. remove all svg files from ./packages/svg
   3. add your own svg files into /original-svg

3. @langhua/el-icon-ext:
   change all '@element-plus/icons-vue' to '@langhua/el-icon-ext'.

<br/>

### References

1. [Element Plus Icons](https://github.com/element-plus/element-plus-icons)
2. [IconFont Website](https://www.iconfont.cn/)
3. [Svgo source code](https://github.com/svg/svgo)
4. [Svgo Document](https://svgo.dev/docs/plugins/)

<br />

### License

[MIT](./LICENSE) License
