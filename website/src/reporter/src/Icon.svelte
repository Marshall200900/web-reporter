<script lang="ts">
    export let open: () => void;
    export let positionStyles: string;
</script>

<div class="icon" on:click={open} style={positionStyles}>
  <span class="icon__text">R</span>
</div>

<style lang="scss">
    .icon {
        position: fixed;
        width: 50px;
        height: 50px;

        background-color: #FF0000;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        span {
          color: white;
          font-size: 2rem;
          user-select: none;
        }
    }
</style>
