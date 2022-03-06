<script lang="ts">
    import SettingsIcon from './assets/settings-icon.svg';
    import BackIcon from './assets/back-icon.svg';
    import CloseIcon from './assets/close-icon.svg';
    import FormInput from './FormInput.svelte';
    import FormSettings from './FormSettings.svelte';
    import FormOk from './FormOk.svelte';
    import FormError from './FormError.svelte';
    
    export let setOpened: (open: boolean) => void;
    enum Tab {
        Input, Settings, Ok, Error
    }
    let prevTab = Tab.Input;
    let currentTab = Tab.Input;

    const setTab = (tab: Tab) => {
        prevTab = currentTab;
        currentTab = tab;
    }
    
    let data = {
        mainText: '', subText: ''
    }

    const onSubmit = (e) => {
        e.preventDefault();
        currentTab = Tab.Error
    }

</script>

<div class="form">
    <div class="form__topbar">
        {#if currentTab === Tab.Settings}
            <div class="form__icon-container form__icon-back" on:click={() => setTab(prevTab)}>
                <img src={BackIcon} alt="settings" class="form__icon">
            </div>
        {:else}
            <div class="form__icon-container" on:click={() => setTab(Tab.Settings)}>
                <img src={SettingsIcon} alt="settings" class="form__icon form__icon-settings">
            </div>
        {/if}
        <div class="form__icon-container" on:click={() => setOpened(false)}>
            <img src={CloseIcon} alt="close" class="form__icon">
        </div>
    </div>
    {#if currentTab === Tab.Input}
        <FormInput bind:data={data} onSubmit={onSubmit} />
    {:else if currentTab === Tab.Ok}
        <FormOk />
    {:else if currentTab === Tab.Settings}
        <FormSettings />
    {:else if currentTab === Tab.Error}
        <FormError />
    {/if}
</div>

<style lang="scss">
    $background-color: #F9F9F9;
    $border-color: #E8E8E8;
    .form {
        display: flex;
        flex-direction: column;

        padding: 10px;
        height: 465px;
        width: 350px;
        position: absolute;
        font-family: 'Roboto', sans-serif;
        border-radius: 10px;
        box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.2);

        right: 0;
        bottom: 0;

        &__topbar {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;
        }

        &__icon {
            width: 20px;
            height: 20px;
        }
        &__icon-back {
            justify-self: left
        }
        &__icon-settings {
            width: 25px;
            height: 25px;
        }
        &__icon-container {
            border-radius: 5px;
            &:hover {
                background-color: #F0F0F0;
            }
            cursor: pointer;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
}
</style>