<script lang="ts">
    import html from '../docs/index.html?url';
</script>
<iframe class="iframe" title="docs" src={html}>
    Your browser does not support iframe
</iframe>
<style lang="scss">
    .iframe {
        position: fixed;
        top: 40px;
        bottom: 0px;
        right: 0px;
        width: 100%;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        z-index: 10;
        height: 100%;
    }
</style>