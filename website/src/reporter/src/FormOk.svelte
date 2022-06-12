<script lang="ts">
    import OkIcon from './assets/ok-icon.svg';
</script>

<div class="form-ok">
    <img src={OkIcon} alt="ok" class="form-ok__image">
    <h1 class="form-ok__main-text">Отчет об ошибке отправлен!</h1>
    <span class="form-ok__sub-text">Информация об ошибке на сайте отправлена и будет принята к рассмотрению</span>
</div>

<style lang="scss">
    .form-ok {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        // .form-ok__image

        &__image {
            
            width: 70px;
            height: 70px;
        }

        // .form-ok__main-text

        &__main-text {
            text-align: center;
            font-family: 'Roboto', 'sans-serif';
            font-weight: 500;
        }
        
        // .form-ok__sub-text
        
        &__sub-text {
            text-align: center;
            font-family: 'Roboto', 'sans-serif';
            font-weight: 500;
        }
    }
</style>