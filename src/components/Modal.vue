<template>
	<div>
		<div
			class="modal fade"
			id="addModal"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<button
						type="button"
						class="btn-close p-3 ms-auto"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
					<div class="modal-body">
						<!--Task Title-->
						<div class="mb-3">
							<label for="taskTitle" class="form-label">Title</label>
							<input type="text" class="form-control" id="taskTitle" v-model="formData.title"/>
						</div>
						<!--Task Description-->
						<div class="mb-3">
							<label for="tastDescription" class="form-label"
								>Description</label
							>
							<textarea
								class="form-control"
								id="taskDescription"
								rows="3"
								v-model="formData.description"
							></textarea>
							<!--Task Due Date-->
							<div class="mb-3">
								<label for="taskDate" class="form-label">Due Date</label>
								<input type="date" class="form-control" id="taskDate" v-model="formData.dueDate"/>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							class="btn btn-primary rounded-pill bg-danger shadow"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							@click="addTask()"
						>
							<i class="bi bi-plus"></i>Add Task
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { usetasksStore } from "../store/tasks";
import Task from "../types/task";

export default defineComponent({
	name: "Modal",
	setup() {
		const store = usetasksStore();

		const formData = ref<Task>({
			id: Math.floor(Math.random() * 1000),
			title: "",
			description: "",
			dueDate: "",
			status: "New Tasks",
		})

		const addTask = () => {
			store.addTask(formData.value);
			formData.value = {
				id: Math.floor(Math.random() * 1000),
				title: "",
				description: "",
				dueDate: "",
				status: "New Tasks",
			}
		}

		return {
			store,
			formData,
			addTask
		}
	},
});
</script>

<style scoped>
.form-control:focus, .form-select:focus {
	outline: none;
	box-shadow: none;
	border: 1px solid black;
}

</style>
