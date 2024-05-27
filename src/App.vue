<template>
  <div id="app">
<!-- 路由占位符，表示当前路由匹配的组件会在这里渲染-->
    <router-view/>
  </div>
</template>

<script>

export default {
  mounted(){

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  //Webkit和Mozilla的字体平滑设置
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
// 自定义进度条颜色
 #nprogress .bar {
      background: #F811B2 !important; //自定义颜色
  }
.cell{
  text-align: center;
}
</style>
