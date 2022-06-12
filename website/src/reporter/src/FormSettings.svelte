<script lang="ts">
import { onMount } from "svelte";

    export let disableReporter;
    export let position;
    export let setDisableReporter: () => void;
    export let setPosition: (position: string) => void;

    const sides = {
        LeftTop: 'LeftTop',
        LeftBottom: 'LeftBottom',
        RightTop: 'RightTop',
        RightBottom: 'RightBottom',
    }
    $: cellSelected = (currentSide) => {
        console.log(currentSide, position);
        return currentSide === position ? "settings__pos-cell_selected" : "";
    }
</script>

<div class="settings">
    <div class="settings__pos-container">
        <div class="settings__pos-table">
            <div on:click={() => setPosition(sides.LeftTop)} class={`settings__pos-cell settings__pos-cell-lt ${cellSelected(sides.LeftTop)}`}></div>
            <div on:click={() => setPosition(sides.LeftBottom)} class={`settings__pos-cell settings__pos-cell-lb ${cellSelected(sides.LeftBottom)}`}></div>
            <div on:click={() => setPosition(sides.RightTop)} class={`settings__pos-cell settings__pos-cell-rt ${cellSelected(sides.RightTop)}`}></div>
            <div on:click={() => setPosition(sides.RightBottom)} class={`settings__pos-cell settings__pos-cell-rb ${cellSelected(sides.RightBottom)}`}></div>
        </div>
        <div class="settings__pos-container-text">
            Позиционирование
        </div>
    </div>
    <div class="settings__remove-button-container">
        <button on:click={setDisableReporter} class="settings__remove-button-btn">Убрать иконку</button>
        <div class="settings__remove-button-text">
            Иконка вернется при перезапуске страницы
        </div>
    </div>
</div>

<style lang="scss">
    @import 'src/reporter/scss/_base.scss';
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
                @include filter(brightness(110%));
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
                @include filter(brightness(110%));
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