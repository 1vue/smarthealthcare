<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import loign from '@/components/login.vue'
import patienthome from '@/components/patient/patienthome.vue'
import managerhome from '@/components/manager/managerhome.vue'
export default {

  components: {
    managerhome
  }
}
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
