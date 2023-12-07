<template>
	<div class="mt-4">
		<section class="container d-flex justify-content-end align-items-center">
			<label for="filters" class="me-2">Filters: </label>
			<select
				class="form-select"
				aria-label="Task filters"
				v-model="filter"
				@change="filterTasks"
			>
				<option>All Tasks</option>
				<option>New Tasks</option>
				<option>In-Progress</option>
				<option>Completed</option>
			</select>
		</section>
		<section class="mt-4 container">
			<div
				v-if="filteredTasks?.length === 0 || filteredTasks === undefined"
				class="text-center mt-5 text-bold text-muted"
			>
				No Tasks Found
			</div>
			<TransitionGroup
				name="list "
				tag="ul"
				v-else
				class="p-2 d-flex flex-wrap gap-3 align-items-center flex-column flex-lg-row"
			>
				<li
					class="border rounded p-3 mb-3"
					v-for="task in filteredTasks"
					:key="task.id"
				>
					<div>
						<div class="d-flex justify-content-between align-items-center">
							<h2 class="text-wrap">{{ task.title }}</h2>
							<i
								class="bi bi-pencil-square icon"
								data-bs-toggle="modal"
								data-bs-target="#editModal"
								@click="editTask(task)"
							></i>
						</div>
						<p class="fst-italic text-wrap">{{ task.description }}</p>
						<div class="d-flex justify-content-between">
							<p>Due Date: {{ task.dueDate }}</p>
							<p>
								<span
									class="py-1 px-2 rounded-pill"
									:class="{
										'bg-primary': task.status === 'New Tasks',
										'bg-warning': task.status === 'In-Progress',
										'bg-success': task.status === 'Completed',
									}"
									>{{ task.status }}</span
								>
							</p>
						</div>
					</div>
				</li>
			</TransitionGroup>
		</section>
	</div>
	<!-- Edit Task Modal -->
	<div>
		<div
			class="modal fade"
			id="editModal"
			tabindex="-1"
			aria-labelledby="editModal"
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
							<input
								type="text"
								class="form-control"
								id="taskTitle"
								v-model="formData.title"
							/>
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
								<input
									type="date"
									class="form-control"
									id="taskDate"
									v-model="formData.dueDate"
								/>
							</div>
							<!--Task Status-->
							<div class="mb-3">
								<label for="taskDate" class="form-label">Status</label>
								<select
									class="form-select"
									aria-label="Task filters"
									v-model="formData.status"
								>
									<option>New Tasks</option>
									<option>In-Progress</option>
									<option>Completed</option>
								</select>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							class="btn btn-primary rounded-pill bg-danger shadow"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							@click.prevent="updateTask()"
						>
							Edit Task
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from "vue";
import { usetasksStore } from "../store/tasks";
import Task from "../types/task";

export default defineComponent({
	name: "TaskList",
	props: {
		tasks: {
			type: (Array as PropType<Task[]>) || undefined,
			required: true,
		},
	},
	components: {},
	setup(props) {
		const store = usetasksStore();
		const filter = ref("All Tasks");
		const filteredTasks = ref<Task[]>();
		const formData = ref({
			id: 0,
			title: "",
			description: "",
			dueDate: "",
			status: "",
		});

		const editTask = (task: Task) => {
			formData.value = {
				id: task.id,
				title: task.title,
				description: task.description,
				dueDate: task.dueDate,
				status: task.status,
			};
		};

		const updateTask = (): void => {
			store.updateTask(formData.value);
		};

		const filterTasks = (): void => {
			if (filter.value === "All Tasks") {
				filteredTasks.value = props.tasks;
			} else if (filter.value === "New Tasks") {
				filteredTasks.value = props.tasks.filter(
					(task) => task.status === "New Tasks"
				);
			} else if (filter.value === "In-Progress") {
				filteredTasks.value = props.tasks.filter(
					(task) => task.status === "In-Progress"
				);
			} else if (filter.value === "Completed") {
				filteredTasks.value = props.tasks.filter(
					(task) => task.status === "Completed"
				);
			}
		};

		onMounted(() => {
			filterTasks();
		});

		return {
			filter,
			filterTasks,
			filteredTasks,
			store,
			formData,
			editTask,
			updateTask,
		};
	},
});
</script>

<style scoped>
.form-select {
	width: 200px;
}
ul {
	list-style: none;
	margin-block-start: 0 !important;
	margin-block-end: 0 !important;
	padding: 0;
}
li {
	width: 25em;
}
.icon {
	font-size: 20px;
	cursor: pointer;
}
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.list-leave-active {
	position: absolute;
}
@media screen and (max-width: 768px) {
	li {
		width: 100%;
	}
}
</style>
