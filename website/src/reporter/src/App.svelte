<script lang="ts">
    import Form from './Form.svelte';
    import Icon from './Icon.svelte';
    
    let position;
    const localStorageSide = localStorage.getItem('position');
    if(!localStorageSide) {
        position = "RightBottom";
        localStorage.setItem('position', "RightBottom");
    } else {
        position = localStorageSide;
    }
    let disableReporter = false;
    let opened = false;

    const setPosition = (pos: string) => {
        localStorage.setItem('position', pos);
        position = pos;
    }
    const setDisableReporter = () => {
        disableReporter = true;
    }

    const setOpened = (open: boolean) => {
        opened = open;
    }
    $: getPositionStyles = () => {
        switch(position) {
            case "RightTop": return "right: 0; top: 0;"
            case "RightBottom": return "right: 0; bottom: 0;"
            case "LeftTop": return "left: 0; top: 0;"
            case "LeftBottom": 
            default: return "left: 0; bottom: 0;"
        }
    }
</script>
{#if !disableReporter}
    {#if opened}
    <Form
        positionStyles={getPositionStyles()}
        setOpened={setOpened}
        setDisableReporter={setDisableReporter}
        setPosition={setPosition}
        disableReporter={disableReporter}
        position={position} />
    {:else}
    <Icon 
        positionStyles={getPositionStyles()}
        open={() => setOpened(true)} />
    {/if}
{/if}
    
<style lang="scss">
    :global(body) {
        font-family: Roboto, sans-serif;
    }
</style>