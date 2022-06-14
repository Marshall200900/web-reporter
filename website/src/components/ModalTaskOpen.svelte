<script lang="ts">
import { onMount } from "svelte";

    import Modal from "./Modal.svelte";
    export let onClose: () => void;
    export let taskId: string;
    let baseAddress = 'http://localhost:1000/reports/';
    let task: {
        report_id: number,
        status: string,
        title: string,
        date_created: string,
        tags: string,
        description: string,
        images_count: number;
    };
    onMount(() => {
        getData().then(async (val) => {
            // if(val.images_count) {
            //     for (let i = 0; i < val.images_count; i++) {
                    
                    
            //     }
            // }
            console.log(val)
            task = val;
        })
    })
    const getData = async () => {
        const res = await fetch(`${baseAddress}${taskId}`);
        const data = await res.json();
        return data;
    }

</script>

<Modal onClick={onClose}>
    <div class="modal-task-edit">
        {#if task}
            <div class="title">{task.title}</div>
            <div class="title">{task.description}</div>
            {#if task.tags}
                <div class="title">{task.tags}</div>
            {/if}
            {#if task.images_count}
                {#each Array(task.images_count) as _, idx}
                    <img src={`${baseAddress}${task.report_id}?image=${idx}`} alt="task-related screenshot"/>
                {/each}
            {/if}
        {/if}
    </div>
</Modal>

<style lang="scss">

</style>