<template>
  <div>
    <NavBar />
    <Overview/>
    <TaskList :tasks="store.taskList"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import Overview from './components/Overview.vue'
import TaskList from './components/TaskList.vue'
import { usetasksStore } from './store/tasks'


export default defineComponent({
  components: {
    NavBar,
    Overview,
    TaskList
  },
  setup () {
    const store = usetasksStore()
    

    return {
      store,
    }
    
  }
})
</script>

<style>
.num {
  font-size: 1.5rem;
  font-weight: bold;
}
.btn {
  border: none;
}
</style>