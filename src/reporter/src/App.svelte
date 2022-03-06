<script lang="ts">
    import Form from './Form.svelte';
    import Icon from './Icon.svelte';

    

    let opened = false;
    const setOpened = (open: boolean) => {
        opened = open;
    }

</script>

{#if opened}
    <Form setOpened={setOpened} />
{:else}
    <Icon open={() => setOpened(true)} />
{/if}

<style lang="scss">

</style>