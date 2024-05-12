<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <query-word></query-word>
</template>

<script>
import QueryWord from "@/components/QueryWord.vue";
export default {
  name: 'App',
  components: {
    QueryWord,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
