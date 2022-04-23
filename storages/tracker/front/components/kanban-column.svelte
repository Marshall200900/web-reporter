<script lang="ts">
    import { Label } from "./kanban-task-label.svelte";

    import KanbanTask from "./kanban-task.svelte";

    export let onMouseDown: (id: number, x: number, y: number, width: number, height: number, relX: number, relY: number) => void;
    export let dragParams: { id: number, x: number, y: number, width: number, height: number, relX: number, relY: number };
    export let columnTitle: string;
    export let tasks: {id: number, title: string, labels: string[], category: string, temp: boolean}[];
    export let pColor: string;
    export let sColor: string;
    export let id: number;

    const getLabelByText = (label: string) => {
        const { BUG, CRITICAL, LOW, BLOCKER } = Label;
        switch(label) {
            case 'bug': return BUG;
            case 'critical': return CRITICAL;
            case 'blocker': return BLOCKER;
            case 'low':
            default: return LOW;
        }
    }
</script>

<div class="kanban-col" style={`background-color: ${pColor}`} id={`column${id}`}>
    <div class="kanban-col__header" style={`background-color: ${sColor}`}>
        <div class="kanban-col__title-container" style={`background-color: ${pColor}`}>
            <span class="kanban-col__title">
                {columnTitle}
            </span>
        </div>
        <div class="kanban-col__header-right-side">
            <span class="kanban-col__task-counter">
                {tasks.filter(el => !el.temp).length}
            </span>
            <div class="kanban-col__button-add">
                <span class="kanban-col__button-add-text">+</span>
            </div>
        </div>
    </div>
    <div class="kanban-col__tasks">
        {#each tasks as task}
            <KanbanTask dragParams={dragParams} onMouseDown={onMouseDown} temp={task.temp} id={task.id} taskTitle={task.title} arrayOfLabels={task.labels.map(getLabelByText)} />
        {/each}
    </div>
</div>
<style lang="scss">
    .kanban-col {
        min-height: 700px;
        flex: 1 0 300px;
        font-family: 'Inter';
        border-radius: 5px;
        &__header {
            border-radius: 5px 5px 0px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 50px;
            padding: 10px;
            box-sizing: border-box;
            position: relative;
        }
        &__header-right-side {
            display: flex;
            align-items: center;
            gap: 10px;
            height: 100%;
        }
        &__title-container {
            display: flex;
            align-items: center;
            border-radius: 5px;
        }

        &__title {
            padding: 7px;
            
        }

        &__task-counter {
            color: white;
            font-weight: 800;
        }

        &__button-add {
            background-color: white;
            display: flex;
            align-items: center;
            border-radius: 5px;
            cursor: pointer;

        }
        &__button-add-text {
            padding: 5px 10px;
        }
        &__tasks {
            padding: 5px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }

</style>