<script lang="ts">
    export let open: () => void;

</script>

<div class="icon" on:click={open}>
  <span class="icon__text">R</span>
</div>

<style lang="scss">
    .icon {
        position: absolute;
        bottom: 0;
        right: 0;
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
