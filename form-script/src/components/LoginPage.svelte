<script lang="ts">
  import Button from "./Button.svelte";
  import base64 from 'base-64';
  export let setAuthorized: (auth: boolean) => void
  // login and password form
  // after success save it in localstorage
  // send every request with the login password
  // send login password -> get token
  // send token with api request -> modify reports
  let login = "";
  let password = "";

  
  const handleAuth = async () => {
    const res = await fetch('http://localhost:1000/login', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + base64.encode(login + ":" + password),
      }
    });
    if(res.status === 200) {
      const token = await res.json();
      // set token in cookie
      document.cookie = `token=${token}`
      console.log(token);
      setAuthorized(true);
    } else {
      console.log('Please authorize!');
    }

  }
</script>

<div class="login-page">
  <form action="" class="login-page__login-form">
    <input bind:value={login} type="text" class="login-page__input" placeholder="login" />
    <input bind:value={password} type="password" class="login-page__input" placeholder="password" />
    <Button backgroundColor="#35C128" color="white" onClick={() => {
      console.log('here');
      if(login.includes(':') || password.includes(':')) {
        alert('You cannot use ":" in your password');
        return;
      }
      handleAuth();
    }} text="Log in"/>
  </form>
</div>

<style lang="scss">
  .login-page {
    background-color: #EBF3FF;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &__input {
        box-sizing: border-box;
        width: calc(100% - 40px);
        border-radius: 5px;
        border: 2px solid #35C128;
        height: 30px;
    }
    &__login-form {
        width: calc(min(350px, 100% - 10px));
        background-color: white;
        padding: 20px 0px;
        
        border: 2px solid #35C128;
        border-radius: 20px;

        

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
  }
  
</style>
