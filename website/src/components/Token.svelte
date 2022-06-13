<script lang="ts">
  export let token: string;
</script>

<div class="token">{token}</div>

<style lang="scss">
  .token {
    width: 300px;
    text-align: center;
    padding: 5px;
    border: 2px solid #35c128;
    border-radius: 10px;
    background-color: white;
  }
</style>
