<script lang="ts">
	export let tag: {tag_id: string, name: string, color: string};
</script>

<div on:mousedown={(e) => {
	e.preventDefault();
	e.stopPropagation();
}} on:mouseup={(e) => {
	e.preventDefault();
	e.stopPropagation();
}}
	class="task-label" style={`background-color: ${tag.color}`}>
	<span class="task-label__text">{tag.name}</span>
</div>
<style type="scss">
	.task-label {
		display: flex;
		border-radius: 10px;
		width: fit-content;

		&__text {
			padding: 5px 10px;
			color: white;
			font-size: 0.8rem;
		}
	}

</style>