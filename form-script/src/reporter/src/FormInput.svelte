<script lang="ts">
    export let data: { mainText: string, subText: string, image: File };
    export let setTagsTab: () => void;
    let inputRef = null;
    const openFileSelection = () => {
        inputRef.click();
    }

    const attachFile = () => {
        if (inputRef && inputRef.files && inputRef.files.length > 0) {
            data.image = inputRef.files[0];
        }
    }

    export let onSubmit;
</script>
<form class="form" on:submit={onSubmit}>
    <div class="form__title">Опишите проблему</div>
    <input bind:value={data.mainText} type="text" class="form__short-description form__textfield" placeholder="Краткое название">
    <textarea bind:value={data.subText} class="form__description form__textfield" placeholder="Описание ошибки"/>
    <div class="form__file-input-container">
        <input type="file" accept="image/*" class="form__file" bind:this={inputRef} on:change={attachFile}>
        <button type="button" class="form__button-attach-file form__button" on:click={openFileSelection}>Приложить файл</button>
        <button type="button" class="form__button-tags form__button" on:click={setTagsTab}>Теги</button>
    </div>
    <button class="form__button-submit form__button">Отправить</button>
</form>
<style lang="scss">
    $background-color: #F9F9F9;
    $border-color: #E8E8E8;
    .form { 
        display: flex;
        flex-direction: column;
        gap: 10px;

        &__files-list {
            display: flex;
            flex-direction: column;
            gap: 5px;
            flex: 1 1;
            overflow-y: scroll;
        }
        
        &__file-input-container {
            gap: 10px;
            display: flex;
            height: 40px;
        }
        &__button {
            font-family: 'Roboto', sans-serif;
            border-radius: 10px;
            cursor: pointer;
            padding: 10px 7px;
            font-size: 1rem;

            background-color: $background-color;
            border: 2px solid $border-color;
            color: #737373;
            flex: 1 1;
            outline-color: #18A0FB;
            font-weight: bolder;
        }

        &__button-submit {
            font-weight: 500;
            outline-color: #18A0FB;
            border-color: $border-color;
            background-color: #0FB50C;
            color: white;
            
            border-radius: 10px;
            border: none;
            width: 110px;

            align-self: center;
        }
        
        &__title {
            font-size: 1.4rem;
            font-weight: bolder;
        }
        &__textfield {
            font-family: 'Roboto', sans-serif;
            padding: 10px;
            border: 2px solid $border-color;
            border-radius: 5px;
            background: $background-color;
            outline-color: #18A0FB;
        }
        
        &__short-description {
            margin-top: 20px;
            font-size: 1.2rem;
        }
        &__description {
            font-size: 1.2rem;
            height: 200px;
        }

        &__file {
            display: none;
        }
}
</style>