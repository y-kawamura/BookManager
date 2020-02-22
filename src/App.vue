<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" mode="horizontal" router>
          <el-menu-item index="1" :route="{ name: 'Home' }">
            Home
          </el-menu-item>
          <el-menu-item index="2" :route="{ name: 'Search' }">
            Search
          </el-menu-item>
          <el-menu-item index="3" :route="{ name: 'Form' }">
            Form
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "1"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
