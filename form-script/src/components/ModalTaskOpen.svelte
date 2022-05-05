<script lang="ts">
import { onMount } from "svelte";

    import Modal from "./Modal.svelte";
    export let onClose: () => void;
    export let taskId: number;

    let task: {
        report_id: number,
        status: string,
        title: string,
        date_created: string,
        tags: string,
        description: string,
    };
    onMount(() => {
        getData().then((val) => {
            task = val;
        })
    })
    const getData = async () => {
        const res = await fetch(`http://localhost:1000/getDataById?id=${taskId}`);
        const data = await res.json();
        return data;
    }

</script>

<Modal onClick={onClose}>
    <div class="modal-task-edit">
        {#if task}
            <div class="title">{task.title}</div>
            <div class="title">{task.description}</div>
            <div class="title">{task.tags}</div>
        {/if}
    </div>
</Modal>

<style lang="scss">

</style>