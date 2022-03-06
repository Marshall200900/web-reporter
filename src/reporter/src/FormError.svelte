<script lang="ts">
    import ErrorIcon from './assets/error-icon.svg';
</script>

<div class="form-error">
    <img src={ErrorIcon} alt="error" class="form-error__image">
    <h1 class="form-error__main-text">Ошибка при <br/> отправке отчета!</h1>
    <span class="form-error__sub-text">При отправке отчета возникла ошибка, сервер не смог ответить на запрос</span>
</div>

<style lang="scss">
    .form-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        // .form-error__image

        &__image {
            
            width: 70px;
            height: 70px;
        }

        // .form-error__main-text

        &__main-text {
            text-align: center;
            font-family: 'Roboto', 'sans-serif';
            font-weight: 500;
        }
        
        // .form-error__sub-text
        
        &__sub-text {
            text-align: center;
            font-family: 'Roboto', 'sans-serif';
            font-weight: 500;
        }
    }
</style>