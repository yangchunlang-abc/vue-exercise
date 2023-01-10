import Mock from 'mockjs'
// 定义随机新闻数据
const { newList } = Mock.mock({
  'newList|75': [
    {
      "id": '@increment(1)',
      "title": '@ctitle()',
      "content": '@cparagraph(5,15)',
      "img_url": "@image('100x100','#ff83fa','#fcfcfc','看看')",
      "add_time": '@date(yyyy-MM-dd)'
    }
  ]
})
//-----------------------------------------------
// 根据url获取参数
const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (let i = 0; i < queryStrArr.length; i++) {
      const item = queryStrArr[i].split('=')

      if (item[0] === name) {
        return item[1]
      }

    }
  } else {
    return null
  }

}
//-------------------------------------
// 定义接口
Mock.mock(/\/api\/get\/news/, 'get', (options) => {
  console.log(options);
  // 获取到的请求参数 页码和页数
  const pageindex = getQuery(options.url, 'pageindex')
  const pagesize = getQuery(options.url, 'pagesize')
  // 1 10 --> 0 9 根据参数过滤数组 返回不同参数
  // 数据起始位置 （pageindex - 1）* pagesize
  // 数据结束位置 (pageindex*pagesize)
  // 总页数  = 数据量/单页面数据量
  const totalPage = Math.ceil(newList.length / pagesize)
  // 每一页的截取
  const start = (pageindex - 1) * pagesize
  const end = pageindex * pagesize
  const list = pageindex > totalPage ? [] : newList.slice(start, end)
  return {
    status: 200,
    message: '获取数据成功!',
    list: list,
    total: newList.length
  }
})
// 定义删除的接口
// 这里删除的是接口的内容不是 表格数据内容
Mock.mock('/api/delete/news', 'post', (option) => {
  const body = JSON.parse(option.body)
  let index = newList.findIndex((item) => {
    return item.id === body.id
  })
  newList.splice(index, 1)
  return {
    status: 200,
    message: '删除成功',
    list: newList,
    total: newList.length
  }
})
// 定义添加的接口 我不明白为什么增删改查都要接口
Mock.mock('/api/add/news', 'post', (option) => {
  const body = JSON.parse(option.body)
  newList.push(
    Mock.mock({
      "id": '@increment(1)',
      "title": body.title,
      "content": body.content,
      "img_url": "@image('100x100','#ff83fa','#fcfcfc','看看')",
      "add_time": '@date(yyyy-MM-dd)'
    })
  )
  return {
    status: 200,
    message: '添加成功',
    list: newList,
    total: newList.length
  }
})