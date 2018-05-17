<template>
  <v-app id="app">
  	 <v-content>
    <router-view/>
     </v-content>
  </v-app>
</template>

<script>



export default {
  name: 'App',
};
</script>

<style>

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 /* color: #212121;*/
  margin-top: 60px;
}
</style>
