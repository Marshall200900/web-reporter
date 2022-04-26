<script lang="ts">
    import { link, Route, Router } from 'svelte-routing';
    import ConfiguratorPage from './components/ConfiguratorPage.svelte';
    import TrackerPage from './components/TrackerPage.svelte';
</script>

<Router>
    <nav class="navbar">navbar</nav>
    <Route path='config' component={ConfiguratorPage} />
    <Route path='/' component={TrackerPage} />
</Router>