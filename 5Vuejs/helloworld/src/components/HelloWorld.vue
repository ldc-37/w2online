<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ vue }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello world',
      vue: 'Hello vue'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h2 {
  color: red;
}
</style>
