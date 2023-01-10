import Mock from 'mockjs'
// const data = Mock.mock({
//   // 生成指定数据
//   // 'string|6': 'hello'
//   // 生成随机数据  括号内是数据长度 以c开头表示中文
//   // String: '@cword(3,10)',
//   // // 随机标题
//   // title: '@ctitle()',
//   // // 随机句子
//   // sentence: '@csentence',
//   // // 随机数字
//   // 'number|1-10': 10,
//   // 增量id
//   // id: '@increment(1)',
//   // 姓名
//   // name: '@cname()',
//   // 身份证号
//   // idCard: '@id()',
//   // 城市
//   // address: '@city(true)',
//   // 图片
//   // img_url: '@image()',
//   //生成数组
//   'list|3': [
//     {
//       name: '@cname(3)',
//       address: '@city(true)',
//       idCard: '@id()'
//     }
//   ]
// })
// console.log(data);
// mock 拦截请求
Mock.mock('/api/news', 'get', {
  status: 200,
  msg: '获取数据成功!'
})