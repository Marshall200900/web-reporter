<script lang="ts">
    export let title: string;
    export let url: string;
</script>
<div class="endpoint-label">
    <span class="endpoint-label__title">{title}</span>
    <span class="endpoint-label__url">{url}</span>
</div>
<style lang="scss">
    .endpoint-label {
        background-color: #35C128;
        width: 230px;
        box-sizing: border-box;
        height: 100px;
		display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 20px;
        border-radius: 30px;
        cursor: pointer;
        &__title {
            color: white;
            font-weight: 500;
            font-size: 1.2rem;
		}
        
		&__url {
            text-align: center;
            width: 100%;
            color: white;
            font-size: 0.8rem;
            text-overflow: ellipsis;
            overflow: hidden; 
            white-space: nowrap;
		}
    }

</style>