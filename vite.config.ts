import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入node提供内置模块path；可以获取绝对路径
import path from 'path'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  //配置代理跨域问题
  /* server:{
         proxy:{
          '/api': {
            target: 'http://syt.taoreset.cn/',
            changeOrigin: true,
          },
         }
  } */
  server:{
         proxy:{
          '/gpt': {
            target: 'https://aip.baidubce.com/',

            changeOrigin: true,
            secure:false,
            rewrite:(path) =>path.replace(/^\/gpt/,'')
          },
          

         }
  }
})
