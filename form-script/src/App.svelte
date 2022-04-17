<script lang="ts">
    import Reporter from './reporter/src/App.svelte';
    import Button from './components/Button.svelte';
    import EndpointLabel from './components/EndpointLabel.svelte';
    import EndpointLabelNew from './components/EndpointLabelNew.svelte';
    let configData = {
        endpoints: [
            { id: 0, title: "Telegram channel", url: "URL: localhost:3000/sendData"}
        ]
    }
    const onSendClick = () => {

    }
</script>

<h1>Web reporter configurator</h1>
<h2>Endpoints</h2>
<div class="endpoints">
    {#each configData.endpoints as endpoint}
        <EndpointLabel title={endpoint.title} url={endpoint.url} />
    {/each}
    <EndpointLabelNew />
</div>
<h2>Reporter script</h2>
<textarea placeholder="The script goes here..."></textarea>
<div class="button-container">
    <Button text={"Get script"} backgroundColor={"#35C128"} color={"#FFFFFF"} onClick={onSendClick}/>
</div>
<!-- <Reporter /> -->
<style lang="scss">
    .endpoints {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .button-container {
        display: flex;
        justify-content: center;
    }

</style>