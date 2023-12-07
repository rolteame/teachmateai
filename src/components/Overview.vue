<template>
	<div class="mt-5 container">
		<header>
			<div class="d-flex justify-content-between align-items-center">
        <h1 class="h1">Overview</h1>
        <button class="btn btn-primary rounded-pill bg-danger shadow" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-plus"></i>Add New Task</button>
      </div>
      <Modal />
			<p>Have a birds eye view of your tasks.</p>
		</header>
	</div>
	<section class="mt-4 container">
		<div class="">
			<div class="overflow-x-auto">
				<div
					class="d-flex flex-md-row align-items-center justify-content-between width-mobile"
				>
					<!--Total Tasks-->
					<div class="card shadow-sm me-2">
						<div class="card-body">
              <img src="../assets/total.svg" alt="Total tasks icon" class="icon">
							<h5 class="card-title">Total Tasks</h5>

							<p class="card-text">
								{{ totalTasks }}
							</p>
						</div>
					</div>
					<!--Open Tasks-->
					<div class="card shadow-sm bg-primary mx-2">
						<div class="card-body">
              <img src="../assets/new.svg" alt="New Task Icon" class="icon">
							<h5 class="card-title">New Tasks</h5>

							<p class="card-text">
								{{ newTasks }}
							</p>
						</div>
					</div>
					<!--In Progress Tasks-->
					<div class="card shadow-sm bg-warning mx-2">
						<div class="card-body">
              <img src="../assets/inprogress.svg" alt="In-Progress Tasks Icon" class="icon">
							<h5 class="card-title">In-Progress Tasks</h5>

							<p class="card-text">
								{{ inProgressTasks }}
							</p>
						</div>
					</div>
					<!--Completed Tasks-->
					<div class="card shadow-sm bg-success ms-2">
						<div class="card-body">
              <img src="../assets/completed.svg" alt="Completed Task Icon" class="icon">
							<h5 class="card-title">Completed Tasks</h5>

							<p class="card-text">
								{{ completedTasks }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import Modal from "./Modal.vue";
import { usetasksStore } from "../store/tasks";

export default defineComponent({
	name: "Overview",
  components: {
    Modal,
  },
	setup() {
		const totalTasks = ref<number>()
    const newTasks = ref<number>()
    const inProgressTasks = ref<number>()
    const completedTasks = ref<number>()

    const store = usetasksStore()

		watchEffect(() => {
			store.getTaskStats()
			totalTasks.value = store.totalTasksCount
			newTasks.value = store.totalNewTasks
			inProgressTasks.value = store.totalInProgressTasks
			completedTasks.value = store.totalCompletedTasks
		})

    // onMounted(() => {
    //   store.getTaskStats()
    //   totalTasks.value = store.totalTasksCount
    //   newTasks.value = store.totalNewTasks
    //   inProgressTasks.value = store.totalInProgressTasks
    //   completedTasks.value = store.totalCompletedTasks
    // })

    return {totalTasks, newTasks,inProgressTasks,completedTasks,store}
	},
});
</script>

<style scoped>
h1 {
	font-weight: bold;
}
.stats {
	width: 100vw;
}

.card {
	width: 300px;
  height: 150px;
  margin-bottom: 10px;
}
.card-title {
  font-weight: normal;
  font-style: italic;
}
.card-text {
	font-weight: bold;
	font-size: 32px;
}
.icon {
  width: 30px;
  margin-bottom: 5px;
}
@media screen and (max-width: 768px) {
  .width-mobile {
    width: max-content;
  }
  
}
</style>
