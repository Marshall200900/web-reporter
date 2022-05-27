<script lang="ts">
    export let text: string;
    export let onClick: (args: unknown) => unknown;
    export let color: string;
    export let backgroundColor: string;
</script>

<div class="button" on:click={onClick} style={`background-color: ${backgroundColor}`}>
    <span class="button__text" style={`color: ${color}`}>{text}</span>
</div>
<style lang="scss">
    .button {
        display: flex;
        width: fit-content;
        border-radius: 5px;
        cursor: pointer;
        &__text {
            font-weight: 500;
            padding: 5px 10px;
        }
    }

</style>