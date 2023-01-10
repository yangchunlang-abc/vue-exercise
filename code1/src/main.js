// 按需导入createApp函数
import { createApp } from 'vue'
// 导入待渲染app.vue函数
import App from './App.vue'
// 调用全局css
import './index.css'
// 调用createApp 创建 SPA实例
const app = createApp(App)
app.mount('#app')