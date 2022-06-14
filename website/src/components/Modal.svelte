<script lang="ts">
    import { fade } from 'svelte/transition';
    export let onClick: () => void;
</script>

<div class="paranja" transition:fade on:click={(e) =>{
    onClick();
}}>
    <div on:click={(e) => {
        e.stopPropagation();
    }} class="modal" transition:fade>
        <slot>no content provided</slot>
    </div>
</div>


<style lang="scss">
    .paranja {
        position: absolute;
        z-index: 3;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba($color: #e4e4e4, $alpha: .4);
    }
    .modal {
        z-index: 4;

        background-color: #ffffff;
        border-radius: 20px;
        max-width: calc(100% - 20px);
        max-height: calc(100% - 20px);
        width: 700px;
        height: 400px;
    }
</style>