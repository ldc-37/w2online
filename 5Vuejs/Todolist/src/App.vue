<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h2>{{ title }}</h2>
    <input v-model="newItem" @keyup.enter="add" class="add">
    <input type="button" value="add" @click="add" class="add">
    <ul>
      <div v-for="item in items">
      <input type="checkbox" :checked="item.isFinished">
      <li :class="[item.isFinished ? 'finished' : '']" @click="toggleFinish(item)">{{ item.index }}.{{ item.label }}</li>
      <!-- or: v-bind:class="{finished: item.isFinished}" -->
      <span @click="remove(item.index)">✖</span>
      </div>
    </ul>
  </div>
</template>

<script>
// let len = 2;
export default {
  data () {
    return {
      title: 'Todolist with Vue',
      items: [
        {
          label: 'an example',
          index: 0,
          isFinished: true
        },
        {
          label: '(click here to finish)',
          index: 1,
          isFinished: false
        }
      ],
      newItem: ''
    }
  },
  methods: {
    toggleFinish: (item) => {
      item.isFinished = !item.isFinished;
    },
    add: function () { //the meaning of 'this' will change when using "arrow function"
      this.items.push ({
        label: this.newItem,
        index: this.items.length,
        isFinished: false
      });
      this.newItem = '';
    },
    remove: function (index) {
      this.items.splice(index,1);
      for(let i = 0;i<this.items.length;i++){
        this.items[i].index = i;
      }
    }
  }
}
</script>

<style>
ul {list-style-type: none;padding-left: 0;text-align: initial;padding-left: 42%;}
ul li,span {display: inline-block;cursor: pointer;}
.add {box-shadow: 0px 0px 8px 0px gold;outline: gold;}
.finished {text-decoration: line-through;color: gray;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
