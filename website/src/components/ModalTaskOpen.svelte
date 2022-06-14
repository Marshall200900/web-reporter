<script lang="ts">
import { onMount } from "svelte";
import KanbanTaskLabel from "./kanban-task-label.svelte";

    import Modal from "./Modal.svelte";
    export let onClose: () => void;
    export let taskId: string;
    let baseAddress = 'http://localhost:1000/reports/';
    let task: {
        report_id: number,
        status: string,
        title: string,
        date_created: string,
        tags: {tag_id: string, name: string, color: string}[],
        description: string,
        images_count: number;
    };
    let images = [];
    onMount(() => {
        getData().then(async (val) => {
            // if(val.images_count) {
            //     for (let i = 0; i < val.images_count; i++) {
                    
                    
            //     }
            // }
            console.log(val);
            task = val;
            for(let i = 0; i < task.images_count; i++) {
                images = [...images, await getImage(i)]
                console.log(images);
            }
        })
    })
    const getData = async () => {
        const cookies = document.cookie.split(";");
        const token = cookies.find((el) => el.includes("token="));
        const tokenVal = token.split("=")[1];
        const res = await fetch(`${baseAddress}${taskId}`, {
            method: 'GET',
            headers: {
            Authorization: "Basic " + tokenVal,
            },
        });
        const data = await res.json();
        return data;
    }
    const getImage = async (idx) => {
        const cookies = document.cookie.split(";");
        const token = cookies.find((el) => el.includes("token="));
        const tokenVal = token.split("=")[1];
        const res = await fetch(`${baseAddress}${task.report_id}?image=${idx}`, {
            method: 'GET',
            headers: {
            Authorization: "Basic " + tokenVal,
            },
        });
        const data = await res.blob();
       
        return window.URL.createObjectURL(data);
    }
</script>

<Modal onClick={onClose}>
    <div class="modal-task-edit">
        {#if task}
            <h1 class="modal-task-edit__title">{task.title}</h1>
            <p class="modal-task-edit__description">{task.description}</p>
            <div class="modal-task-edit__tags-container">
                {#each task.tags as tag}
                    <KanbanTaskLabel tag={tag} />
                {/each}
            </div>
            {#if task.images_count}
                {#each Array(task.images_count) as _, idx}
                    <img class="modal-task-edit__image" src={images[idx]} alt="task-related screenshot"/>
                {/each}
            {/if}
        {/if}
    </div>
</Modal>

<style lang="scss">
    .modal-task-edit {        
        padding: 10px;
        margin: 10px;
        box-sizing: border-box;
        height: calc(100% - 20px);
        overflow-y: scroll;
        &__title {
            
        }
        
        &__description {
        }
            
        &__tags-container {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
        }
        &__image {
            padding-top: 10px;
            width: 100%;
        }
    }

</style>