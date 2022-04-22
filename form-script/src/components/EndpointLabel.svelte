<script lang="ts">
    export let title: string;
    export let url: string;

    let opened = false;
    let moved = false;
</script>
<div class="endpoint-label" on:click={() => {
    opened = !opened;
    // $: setTimeout(() => moved = !moved);
}}>
    <span class="endpoint-label__title">{title}</span>
    <span class="endpoint-label__url">{url}</span>
</div>
{#if opened}
    <div class={`endpoint-opened ${moved ? "" : "endpoint-opened_moved"}`}>

    </div>
{/if}
<style lang="scss">
    .endpoint-opened {
        background-color: #35C128;
        width: 230px;
        position: absolute;
        height: 100px;
        border-radius: 30px;
        transition: all 1s ease 0s;
        &_moved {
            left: 50%;
            top: 50%;
            transition: all 1s ease;
        }
    }

    .endpoint-label {
        background-color: #35C128;
        width: 230px;
        box-sizing: border-box;
        height: 100px;
		display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 20px;
        border-radius: 30px;
        cursor: pointer;
        &__title {
            color: white;
            font-weight: 500;
            font-size: 1.2rem;
		}
        
		&__url {
            text-align: center;
            width: 100%;
            color: white;
            font-size: 0.8rem;
            text-overflow: ellipsis;
            overflow: hidden; 
            white-space: nowrap;
		}
    }

</style>