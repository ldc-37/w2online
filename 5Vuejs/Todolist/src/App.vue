<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h2>{{ title }}</h2>
    <input v-model="newItem" @keyup.enter="add" class="add">
    <!-- difference between 'add()' & 'and'? -->
    <input type="button" value="add" @click="add" class="add">
    <ul>
      <div v-for="item in items">
      <input type="checkbox" :checked="item.isFinished">
      <span>{{ item.index }}-</span>

      <input type="text" class="edit"
      v-model="item.label"
      v-if="item.isEditing"
      @keyup.enter="toggleEditStatus(item.index)"
      @blur="toggleEditStatus(item.index)">

      <li
      :class="{finished: item.isFinished}"
      @click="toggleFinish(item)"
      v-if="!item.isEditing"
      >{{ item.label }}.&nbsp;</li>

      <span @click="toggleEditStatus(item.index)" title="编辑/完成编辑">✏</span>
      <span @click="remove(item.index)" title="删除该项">✖</span>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Todolist with Vue',
      items: [
        {
          label: 'a finished example',
          index: 0,
          isFinished: true,
          isEditing: false
        },
        {
          label: '(click here to finish)',
          index: 1,
          isFinished: false,
          isEditing: false
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
        isFinished: false,
        isEditing: false
      });
      this.newItem = '';
    },
    toggleEditStatus: function (index) {
      this.items[index].isEditing = !this.items[index].isEditing;
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
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.edit {font-size: 20px;}
</style>
