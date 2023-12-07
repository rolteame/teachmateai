<template>
	<div>
		<nav class="navbar shadow-sm">
			<div class="container">
				<span class="navbar-brand mb-0 h1">
          <img src="../assets/logo.png" alt="Teachmate logo" class="logo">
        </span>
				
					<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">
								<img src="../assets/person-circle.svg" alt="User Avatar" class="icon">
							</a>
						</li>
					</ul>
				
			</div>
		</nav>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "NavBar",
	setup() {
		return {};
	},
});
</script>

<style scoped>
.logo {
  width: 300px;
}
.icon {
  width: 40px;
  padding-right: 10px;
}
@media screen and (max-width: 768px) {
  .logo {
		width: 200px;
	}
  
}
</style>
