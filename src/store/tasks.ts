import { defineStore } from 'pinia';
import { ref } from 'vue';
import Task from '../types/task';

export const usetasksStore = defineStore('tasks', () => {
  const taskList = ref<Task[]>([])
  const totalTasksCount = ref<number>()
  const totalInProgressTasks = ref<number>()
  const totalNewTasks = ref<number>()
  const totalCompletedTasks = ref<number>()

  const getTaskStats = (): void => {
    totalTasksCount.value = taskList.value.length
    totalInProgressTasks.value = taskList.value.filter((task) => task.status === 'In-Progress').length
    totalNewTasks.value = taskList.value.filter((task) => task.status === 'New Tasks').length
    totalCompletedTasks.value = taskList.value.filter((task) => task.status === 'Completed').length
  }

  const addTask = (task: Task) => {
    taskList.value.push(task)
    getTaskStats()
  }

  const updateTask = (task: Task): void => {
    const index = taskList.value.findIndex((t) => t.id === task.id)
    taskList.value[index] = task
  }
  
  return {
    taskList,
    // getTasks,
    // getNewTasks,
    // getInProgressTasks,
    // getCompletedTasks,
    totalTasksCount,
    totalInProgressTasks,
    totalNewTasks,
    totalCompletedTasks,
    addTask,
    getTaskStats,
    updateTask
  }
},
{
  persist: {
    paths: ['taskList'],
  }
});