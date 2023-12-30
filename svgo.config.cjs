module.exports = {
  plugins: [
    // step 1: use preset-default
    {
      name: 'preset-default'
    },
    // step 2: remove 3 attributes of svg node
    {
      name: "removeAttrs",
      params: {
        attrs: ["svg:width", "svg:height", "svg:class", "path:style"]
      },
    },
    // step 3: set fill attribute of path node to currentColor
    {
      name: "addPathFillCurrentColor",
      params: {},
      fn: (root, params) => {
        return {
          element: {
            enter: (node) => {
              if (node.name === 'path' && (!node.attributes['fill'] || node.attributes['fill'] !== 'currentColor')) {
                node.attributes['fill'] = 'currentColor';
              }
            }
          }
        }
      }
    },
  ]
}
