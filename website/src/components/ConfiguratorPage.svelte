<script lang="ts">
  import { onMount } from "svelte";

  import Reporter from "../reporter/src/App.svelte";
  import Button from "./Button.svelte";
  import ModalTokenOpen from "./ModalTokenEdit.svelte";
import Token from "./Token.svelte";

  let tokens: {
    token_id: number;
    token: string;
  }[] = [];
  let modalTokenEditVisible = false;
  let tokenIdToEdit = null;
  const onSendClick = () => {};

  onMount(() => {
    getTokens();
  });
  const getBrowserTokenValue = () => {
    const data = document.cookie.split(";");
    const token = data.find((el) => el.includes("token="));
    return token.split("=")[1];
  };
  const getTokens = async () => {
    const tokenVal = getBrowserTokenValue();
    const res = await fetch("http://localhost:1000/tokens", {
      headers: {
        Authorization: "Basic " + tokenVal,
      },
    });
    if (res.status === 200) {
      tokens = await res.json();
    } else {
      alert("Oh no! Error!");
    }
  };
  const deleteToken = async (tokenId: number) => {
    const tokenVal = getBrowserTokenValue();
    const res = await fetch(`http://localhost:1000/tokens/${tokenId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + tokenVal,
      },
    });
    if (res.status === 200) {
      getTokens();
    } else {
      alert("Error occured!");
    }
  };
  const openTokenConfigModal = (tokenId: number) => {
    modalTokenEditVisible = true;
    tokenIdToEdit = tokenId;
  };
  const copyToken = (tokenText: string) => {
    navigator.clipboard.writeText(tokenText).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
  const addToken = async () => {
    const tokenVal = getBrowserTokenValue();
    const res = await fetch("http://localhost:1000/token", {
      method: "GET",
      headers: {
        Authorization: "Basic " + tokenVal,

      },
    });
    if (res.status === 200) {
      getTokens();
    } else {
      
      alert("Error occured!");
    }
  };
</script>

<h1>Web reporter configurator</h1>
<div class="wrapper">
  <div class="tokens-wrapper">
    <div class="tokens-wrapper__header-container">
      <h2>Tokens</h2>
      <Button
        text="+ Add token"
        backgroundColor="#35C128"
        color="white"
        onClick={addToken}
      />
    </div>
    <div class="tokens-wrapper__tokens-container">
      {#each tokens as token}
        <div class="token">
          <Token token={token.token} />
          <Button
            text="config"
            backgroundColor="#4054BB"
            color="white"
            onClick={() => openTokenConfigModal(token.token_id)}
          />
          <Button
            text="copy"
            backgroundColor="#35C128"
            color="white"
            onClick={() => copyToken(token.token)}
          />
          <Button
            text="delete"
            backgroundColor="#C12828"
            color="white"
            onClick={() => deleteToken(token.token_id)}
          />
        </div>
      {/each}
    </div>
  </div>
  <div class="script-wrapper">
    <h2>Reporter script</h2>
    <textarea
      placeholder="The script goes here..."
      class="script-wrapper__script-container"
    />
  </div>
</div>
<div class="button-container">
  <Button
    text={"Get script"}
    backgroundColor={"#35C128"}
    color={"#FFFFFF"}
    onClick={onSendClick}
  />
</div>
<Reporter />
{#if modalTokenEditVisible}
  <ModalTokenOpen
    onClose={() => (modalTokenEditVisible = false)}
    tokenId={tokenIdToEdit}
  />
{/if}


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
    &__header-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
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
    width: 500px;
  }
</style>
