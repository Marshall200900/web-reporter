<script lang="ts">
    export let position;
</script>

<div class="settings">
    <div class="settings__pos-container">
        <div class="settings__pos-table">
            <div class="settings__pos-cell settings__pos-cell-lt"></div>
            <div class="settings__pos-cell settings__pos-cell-lb"></div>
            <div class="settings__pos-cell settings__pos-cell-rt"></div>
            <div class="settings__pos-cell settings__pos-cell-rb settings__pos-cell_selected"></div>
        </div>
        <div class="settings__pos-container-text">
            Позиционирование
        </div>
    </div>
    <div class="settings__remove-button-container">
        <button class="settings__remove-button-btn">Убрать иконку</button>
        <div class="settings__remove-button-text">
            Иконка вернется при перезапуске страницы
        </div>
    </div>
</div>

<style lang="scss">
    .settings {
        margin-top: 20px;

        display: flex;
        flex-direction: column;
        gap: 50px;
        // .settings__pos-container

        &__pos-container {
            width: 130px;
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 5px;
        }

        // .settings__pos-container-text

        &__pos-container-text {
            font-size: 0.8rem;
        }

        // .settings__pos-table

        &__pos-table {
            position: relative;
            width: 125px;
            height: 85px;
        }

        // .settings__pos-cell

        &__pos-cell {
            width: 60px;
            height: 40px;
            background-color: #C4C4C4;
            border-radius: 5px;
            position: absolute;

            &:hover {
                filter: brightness(110%);
            }
            &_selected {
                background-color: #0FB50C ;

            }
        }

        // .settings__pos-cell-lt

        &__pos-cell-lt {
            left: 0;
            top: 0;
        }
        
        // .settings__pos-cell-lb
        
        &__pos-cell-lb {
            left: 0;
            bottom: 0;
        }
        
        // .settings__pos-cell-rt
        
        &__pos-cell-rt {
            right: 0;
            top: 0;
        }
        
        // .settings__pos-cell-rb
        
        &__pos-cell-rb {
            right: 0;
            bottom: 0;
        }

        // .settings__remove-button-container

        &__remove-button-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        // .settings__remove-button-btn

        &__remove-button-btn {
            font-size: 1rem;
            padding: 3px 10px;
            border: none;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.3);
            width: 130px;
            cursor: pointer;
            &:hover {
                filter: brightness(110%);
            }
        }

        // .settings__remove-button-text

        &__remove-button-text {
            width: 130px;
            font-size: 0.6rem;
            text-align: center;
        }
}

</style>