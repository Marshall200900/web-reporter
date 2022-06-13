<script lang="ts">
import { onMount } from "svelte";

  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";
  import Token from "./Token.svelte";
  export let tokenId: number;
  export let onClose: () => void;
  let textareaValue = "";
  let token = "";
  const getBrowserTokenValue = () => {
    const data = document.cookie.split(";");
    const token = data.find((el) => el.includes("token="));
    return token.split("=")[1];
  };
  const getToken = async () => {
    const tokenVal =  getBrowserTokenValue();
    const res = await fetch(`http://localhost:1000/tokens/${tokenId}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + tokenVal,
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (res.status === 200) {
      const tokenContents = await res.json();
      textareaValue = tokenContents.addresses;
      token = tokenContents.token;
    } else {
      alert("Error occured!");
    }
  }
  onMount(() => {
    getToken();
  })


  const editToken = async () => {
    const tokenVal =  getBrowserTokenValue();
    const res = await fetch(`http://localhost:1000/tokens/${tokenId}`, {
      method: "PUT",
      headers: {
        Authorization: "Basic " + tokenVal,
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ addresses: textareaValue ? textareaValue.replaceAll(',', '') : '' })
    });
    if (res.status === 200) {
      onClose();
    } else {
      console.log(res);
      alert("Error occured!");
    }
  };
</script>

<Modal onClick={onClose}>
  <div class="container">
    <Token token={token} />
    <p>Enter the adresses you are using. Split them with line breaks.</p>
    <textarea
      bind:value={textareaValue}
      class="container__textarea"
      placeholder="Enter addresses here..."
    />
    <Button text="Save" backgroundColor="white" color="black" onClick={() => editToken()} />
  </div>
</Modal>

<style lang="scss">
  .container {
    padding: 10px;
    &__textarea {
      box-sizing: border-box;
      width: 100%;
      height: 200px;
      resize: none;
      border-radius: 5px;
    }
  }
</style>
