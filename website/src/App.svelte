<script lang="ts">
  import { link, Route, Router, navigate } from "svelte-routing";
  import ConfiguratorPage from "./components/ConfiguratorPage.svelte";
  import DocsPage from "./components/DocsPage.svelte";
  import LoginPage from "./components/LoginPage.svelte";
  import TrackerPage from "./components/TrackerPage.svelte";
  let authorized = false;

  const auth = async () => {
    if (document.cookie.includes("token")) {
      const data = document.cookie.split(";");
      const token = data.find((el) => el.includes("token="));
      const tokenVal = token.split("=")[1];

      const res = await fetch("http://localhost:1000/auth", {
        method: "POST",
        headers: {
          Authorization: "Basic " + tokenVal,
        },
      });
      if (res.status === 200) {
        authorized = true;
      } else {
        alert("Something is wrong!");
      }
    }
  };
  auth();

  const linkClick = (href) => {
    navigate(href);
  }
</script>

{#if authorized}
  <Router>
    <nav class="navbar">
      <div on:click={() => linkClick("/")} class="navbar__link-container">
        <a class="navbar__link">Kanban</a>
      </div>
      <div on:click={() => linkClick("config")} class="navbar__link-container">
        <a class="navbar__link">Configurator</a>
      </div>
      <div on:click={() => linkClick("docs")} class="navbar__link-container">
        <a class="navbar__link">Documentation</a>
      </div>
    </nav>

    <Route path="login">
      <LoginPage setAuthorized={() => navigate("/config", { replace: true })} />
    </Route>
    <Route path="config" component={ConfiguratorPage} />
    <Route path="/" component={TrackerPage} />
    <Route path="/docs" component={DocsPage} />
  </Router>
{:else}
  <LoginPage setAuthorized={(auth) => (authorized = auth)} />
{/if}

<style lang="scss">
  .navbar {
    height: 50px;
    background-color: #35C128;
    gap: 10px;
    display: flex;
    &__link-container {
      
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0px 10px;
      &:hover {
        background-color: #299a1f;
        
      }
    }
    &__link {
      text-decoration: none;
      color: black;
    }

  }
</style>
