<template>
  <div>
    <!-- 搜索 -->
    <div class="add">
      <input type="text" v-model="title" placeholder="输入标题" />
      <input type="text" v-model="content" placeholder="输入内容" />
      <button @click="add">添加</button>
    </div>
    <!--  表格-->
    <div class="news_list">
      <table>
        <tr>
          <th>图片</th>
          <th>标题</th>
          <th>内容</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in list" :key="item.id">
          <td><img :src="item.img_url" alt="" /></td>
          <td>{{ item.title }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.add_time }}</td>
          <td><button class="remove" @click="remove(item.id)">删除</button></td>
        </tr>
      </table>
    </div>

    <!-- 上下页 -->
    <div class="pages">
      <button @click="prevPage" :disabled="flag1">上一页</button>
      <button @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    this.getNewsList()
  },
  data() {
    return {
      title: "",
      content: "",
      list: [],
      pageindex: 1,
      flag1:false,
      flag:false
    };
  },
  methods: {
    add() {
      if (this.title.trim() === "" || this.content.trim() === "") {
        return alert("请添加那些新闻标题和内容");
      }
      console.log(this.title, this.content);
      axios.post('/api/add/news', {
        title: this.title,
        content:this.content
      }).then((res) => {
        //  post请求时 提交参数给接口
        console.log(res);
      })
    },
    //获取新闻列表数据
   async getNewsList() {
     const { data: res } = await axios.get('/api/get/news', {
       params: {
        pageindex: this.pageindex,
        pagesize:10
      }
     })
     this.list = res.list
    },
    // 删除新闻
    remove(id) {
      axios.post('/api/delete/news', {
        id
      }).then((res) => {
        console.log(res);
      })
    },
    // 上一页
    prevPage() {
      this.pageindex--
      if (this.pageindex < 1) {
        // 禁用按钮
      this.flag1 = true
      } else {
        
        this.getNewsList()
      }
     },
    // 下一页
    nextPage() {
      // 启用 上一页按钮
      this.flag1 = false
      this.pageindex++
      if (this.pageindex > 8) {
         // 禁用按钮
         this.flag = true
      } else {
        this.flag = false
        this.getNewsList()
      }
      
    }

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.add input {
  border-radius: 5px;
  border: none;
  outline: none;
  border: 1px solid #999;
  padding: 5px;
  margin-right: 5px;
}
button {
  width: 100px;
  height: 30px;
  background: #409eff;
  color: none;
  outline: none;
  border-radius: 5px;
  margin-left: 5px;
  cursor: pointer;
  border: 0;
  color: #fff;
}
.news_list {
  width: 1220px;
  height: 495px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 10px;
}
table {
  border-collapse: collapse;
  height: 495px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 10px;
  border: 1px solid rgb(94, 92, 92);
}
table th {
  font-size: 16px;
  height: 30px;
  width: 224px;
  font-weight: normal;
  border: 1px solid rgb(94, 92, 92);
}
table td {
  font-size: 12px;
  padding: 5px;
  border: 1px solid rgb(94, 92, 92);
}
table td:nth-child(1) {
  width: 100px;
  height: 100px;
}
table td:nth-child(4) {
  width: 150px;
}
table td:nth-child(2) {
  min-width: 100px;
}

table .remove {
  background: #f56c6c;
}
</style>