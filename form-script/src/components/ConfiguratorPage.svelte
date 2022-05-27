<script lang="ts">
    import { onMount } from 'svelte';

    import Reporter from '../reporter/src/App.svelte';
    import Button from './Button.svelte';

    let tokens: {
        token_id: number,
        token: string,
    }[] = [];

    const onSendClick = () => {

    }

    onMount(() => {
        getTokens();
    })
    const getTokens = async () => {
        const data = document.cookie.split(";");
        const token = data.find((el) => el.includes("token="));
        const tokenVal = token.split("=")[1];
        const res = await fetch('http://localhost:1000/tokens', {
          headers: {
            Authorization: "Basic " + tokenVal,
          },
        });
        if(res.status === 200) {
            tokens = await res.json();
        } else {
            alert('Oh no! Error!');
        }
    }
</script>

<h1>Web reporter configurator</h1>
<div class="wrapper">
    <div class="tokens-wrapper">
        <h2>Tokens</h2>
        <div class="tokens-wrapper__tokens-container">
            {#each tokens as token}
                <div class="token">
                    <div class="token__token-string">{token.token}</div>
                    <Button text="copy" backgroundColor="#35C128" color="white" onClick={() => {}}/>
                </div>
            {/each}
        </div>
    </div>
    <div class="script-wrapper">
        <h2>Reporter script</h2>
        <textarea placeholder="The script goes here..." class="script-wrapper__script-container">
            
        </textarea>
    </div>
</div>
<div class="button-container">
    <Button text={"Get script"} backgroundColor={"#35C128"} color={"#FFFFFF"} onClick={onSendClick}/>
</div>
<Reporter />
<style lang="scss">
    .button-container {
        display: flex;
        justify-content: center;
        
    }
    .wrapper {
        padding: 10px;
        display: flex;
        gap: 20px;
    }
    .tokens-wrapper {
        flex: 1 1;
        &__tokens-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
    .script-wrapper {
        flex: 1 1;

        &__script-container {
            width: 100%;
            height: 500px;
            border: 1px solid black;
            border-radius: 10px;
        }
    }
    .token {
        display: flex;
        gap: 5px;
        justify-content: space-between;
        align-items: center;
        width: 300px;
        &__token-string {
            width: 100%;
            text-align: center;
            padding: 5px;
            border: 2px solid #35C128;
            border-radius: 10px;
        }
    }
    

</style>