<script lang="ts">
    import { Link, Route, Router } from 'svelte-routing';
    import ConfiguratorPage from './components/ConfiguratorPage.svelte';
    import DocsPage from './components/DocsPage.svelte';
    import TrackerPage from './components/TrackerPage.svelte';
    
</script>


<Router>
    <nav class="navbar">
        <Link to="/">Kanban</Link>
        <Link to="config">Configurator</Link>
        <Link to="docs">Documentation</Link>
    </nav>
    <Route path='config' component={ConfiguratorPage} />
    <Route path='/' component={TrackerPage} />
    <Route path='/docs' component={DocsPage} />
</Router>