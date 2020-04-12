<template>
  <div id="app">
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
views/
<script>
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
import Todo from "./views/todo/todo.vue";

export default {
  components: {
    Header,
    Footer,
    Todo
  }
};
</script>

<style scoped>
#app {
  margin: auto;
}
</style>
