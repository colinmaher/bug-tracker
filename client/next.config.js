// const withImages = require('next-images')
// module.exports = withImages({
//   env: {
//     "CLIENT_ID": "0oa3ovx5xlG06mLtD357",
//     "DOMAIN": "https://dev-120993.okta.com"
//   },
// })
const withOptimizedImages = require('next-optimized-images');
module.exports = withOptimizedImages({
  env: {
    "CLIENT_ID": "0oa3ovx5xlG06mLtD357",
    "DOMAIN": "https://dev-120993.okta.com"
  },
})
