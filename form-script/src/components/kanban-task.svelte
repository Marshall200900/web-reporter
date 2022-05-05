<script lang="ts" context="module">

</script>
<script lang="ts">

    import type { Label } from "./kanban-task-label.svelte";
    import TaskLabel from './kanban-task-label.svelte';
    export let taskTitle: string;
    export let dragParams: { id: number, x: number, y: number, width: number, relX: number, relY: number };
    export let temp: boolean;
    export let id: number;
    export let arrayOfLabels: Label[];
    export let onMouseDown: (id: number, x: number, y: number, width: number, height: number, relX: number, relY: number) => void;
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
        console.log(event.clientX, event.clientY);
        console.log(event.offsetX, event.offsetY);
        console.log(target.getBoundingClientRect().x,target.getBoundingClientRect().y)
        onMouseDown(
            id,
            event.clientX, event.clientY,
            target.offsetWidth,
            target.offsetHeight,
            event.offsetX + 5, event.offsetY + 5,
        );
    }
</script>
<div
    class="task"
    style={styleParams}
    on:mousedown={mouseDownHandler}
    >
    <span class="task__text" 
    on:mousedown={(e) => {
        e.stopPropagation();
    }}
    on:mouseup={(e) => {
        e.stopPropagation();
        openEditModal();
    }}>
        {taskTitle}
    </span>
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

        &__task-labels {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
    }

</style>