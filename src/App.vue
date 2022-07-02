<template>
  <!-- keep-alive实现组件缓存：Vue2用法 -->
  <!-- <keep-alive include="HomeView">
    <router-view />
  </keep-alive> -->
  <!-- Vue3用法 -->
  <router-view v-slot="{ Component }">
    <keep-alive include="HomeView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
html,
body {
  min-height: 100%;
  overflow-x: hidden;
  background: #f4f4f4;
}
#app {
  margin: 0 auto;
  /* max-width: 750px; ---写在这变成rem就不准了*/
  background: #fff;
}
</style>
