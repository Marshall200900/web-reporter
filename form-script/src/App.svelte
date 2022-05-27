<script lang="ts">
    import { Link, Route, Router, navigate } from "svelte-routing";
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
</script>

{#if authorized}
  <Router>
    <nav class="navbar">
      <Link to="/">Kanban</Link>
      <Link to="config">Configurator</Link>
      <Link to="docs">Documentation</Link>
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
