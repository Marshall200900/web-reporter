<script lang="ts" context="module">

</script>
<script lang="ts">

    import type { Label } from "./kanban-task-label.svelte";
    import TaskLabel from './kanban-task-label.svelte';
    export let taskTitle: string;
    export let dragParams: { id: string, x: number, y: number, width: number, relX: number, relY: number };
    export let temp: boolean;
    export let id: string;
    export let arrayOfLabels: Label[];
    export let deleteTask: () => void;
    export let onMouseDown: (id: string, x: number, y: number, width: number, height: number, relX: number, relY: number) => void;
    export let openEditModal: () => void;
    $: styleParams = "";
    $: if (temp) {
        styleParams = `position: absolute; left: ${dragParams.x}px; top: ${dragParams.y}px; width: ${dragParams.width - 20}px; z-index: 3`
    } else if (id === dragParams.id) {
        styleParams = "visibility: hidden";
    } else {
        styleParams = ""
    }
    const mouseDownHandler = (event: MouseEvent) => {
        const target = (<HTMLDivElement>event.currentTarget);
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left; //x position within the element.
        const y = event.clientY - rect.top;  //y position within the element.
        
        console.log(target.getBoundingClientRect().x,target.getBoundingClientRect().y)
        onMouseDown(
            id,
            event.clientX, event.clientY,
            target.offsetWidth,
            target.offsetHeight,
            x + 8, y + 27, // WHY DO I NEED THESE NUMBERS???
        );
    }
</script>
<div
    class="task"
    style={styleParams}
    on:mousedown={mouseDownHandler}>
    <div class="task__title-container">
        <span class="task__text"> 
            {taskTitle}
        </span>
        <span on:mousedown={(e) => {
            e.stopPropagation();
        }} on:click={deleteTask} class="task__text task__delete-btn"> 
            Delete
        </span>
    </div>
    <div class="task__task-labels">
        {#each arrayOfLabels as label}
            <TaskLabel label={label} />
        {/each}
    </div>
</div>
<style lang="scss">
    .task {
        z-index: 2;
        position: relative;
        cursor: pointer;
        user-select: none;
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        border-radius: 5px;
        &__text:hover {
            text-decoration: underline;
        }
        &__title-container {
            display: flex;
            justify-content: space-between;
        }
        &__delete-btn {
            color: gray;
        }
        &__task-labels {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
    }

</style>