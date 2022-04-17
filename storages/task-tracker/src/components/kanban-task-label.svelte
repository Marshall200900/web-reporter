<script lang="ts" context="module">
	export enum Label {
		BUG,
		CRITICAL,
		LOW,
		BLOCKER
	}
</script>

<script lang="ts">
	export let label: Label;
	const getValueObj = (label: Label): { text: string; color: string } => {
		const { BUG, CRITICAL, LOW, BLOCKER } = Label;
		switch (label) {
			case BUG:
				return { text: 'bug', color: '#FF0404' };
			case CRITICAL:
				return { text: 'critical', color: '#FF6A6A' };
			case LOW:
				return { text: 'low', color: '#4CDE3F' };
			case BLOCKER:
			default:
				return { text: 'bug', color: '#000000' };
		}
	};
	$: object = getValueObj(label);
</script>

<div class="task-label" style={`background-color: ${object.color}`}>
	<span class="task-label__text">{object.text}</span>
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