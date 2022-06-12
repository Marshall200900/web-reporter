<script context="module" lang="ts">
  export interface Tag {
    name: string;
    color: string;
    id: number;
    checked: boolean;
  }
</script>

<script lang="ts">
  import SettingsIcon from "./assets/settings-icon.svg";
  import BackIcon from "./assets/back-icon.svg";
  import CloseIcon from "./assets/close-icon.svg";
  import FormInput from "./FormInput.svelte";
  import FormSettings from "./FormSettings.svelte";
  import FormOk from "./FormOk.svelte";
  import FormError from "./FormError.svelte";
  import FormTags from "./FormTags.svelte";

  export let setOpened: (open: boolean) => void;
  export let disableReporter: boolean;
  export let position: string;
  export let setDisableReporter: () => void;
  export let setPosition: (position: string) => void;
  export let positionStyles: string;

  enum Tab {
    Input,
    Settings,
    Ok,
    Error,
    Tags,
  }
  let prevTab = Tab.Input;
  let currentTab = Tab.Input;

  const setTab = (tab: Tab) => {
    prevTab = currentTab;
    currentTab = tab;
  };
  let tags = [];

  const loadTags = async () => {
    const cookies = document.cookie.split(";");
    const token = cookies.find((el) => el.includes("token="));
    const tokenVal = token.split("=")[1];
    const res = await fetch("http://localhost:1000/tags", {
      headers: {
        Authorization: "Basic " + tokenVal,
      },
    });
    if (res.status === 200) {
      const tagsLoaded = await res.json();
      tags = tagsLoaded.map((tag) => {
        const { name, color, tag_id } = tag;
        return {
          name,
          color,
          id: tag_id,
          checked: false,
        };
      });
    }
  };
  const checkTag = (id: number) => {
    const checkedTagIndex = tags.findIndex(tag => tag.id === id);
    const checkedTag = tags[checkedTagIndex];
    const newCheckedTag = {...checkedTag, checked: !checkedTag.checked};
    tags = [
      ...tags.slice(0, checkedTagIndex),
      newCheckedTag,
      ...tags.slice(checkedTagIndex + 1)
    ]
  };

  let data = {
    mainText: "",
    subText: "",
    image: null,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    currentTab = Tab.Ok;

    const { mainText, subText, image } = data;

    const formData = new FormData();
    formData.append("title", mainText);
    formData.append("maintext", subText);
    formData.append("images", image);
    const result = async () => {
      
      const response = await fetch('http://localhost:1000/reports', {
        method: "POST",
        body: formData,
      });
      return response.text();
    }
    await result();
  };
</script>

<div class="form" style={positionStyles}>
  <div class="form__topbar">
    {#if currentTab === Tab.Settings || currentTab === Tab.Tags}
      <div
        class="form__icon-container form__icon-back"
        on:click={() => setTab(prevTab)}
      >
        <img src={BackIcon} alt="backicon" class="form__icon" />
      </div>
    {:else}
      <div class="form__icon-container" on:click={() => setTab(Tab.Settings)}>
        <img
          src={SettingsIcon}
          alt="settings"
          class="form__icon form__icon-settings"
        />
      </div>
    {/if}
    <div class="form__icon-container" on:click={() => setOpened(false)}>
      <img src={CloseIcon} alt="close" class="form__icon" />
    </div>
  </div>
  {#if currentTab === Tab.Input}
    <FormInput
      bind:data
      {onSubmit}
      setTagsTab={() => {
        setTab(Tab.Tags);
      }}
    />
  {:else if currentTab === Tab.Ok}
    <FormOk />
  {:else if currentTab === Tab.Settings}
    <FormSettings
      setDisableReporter={setDisableReporter}
      setPosition={setPosition}
      disableReporter={disableReporter}
      position={position} />
  {:else if currentTab === Tab.Error}
    <FormError />
  {:else if currentTab === Tab.Tags}
    <FormTags {checkTag} {loadTags} {tags} />
  {/if}
</div>

<style lang="scss">
  $background-color: #f9f9f9;
  $border-color: #e8e8e8;
  .form {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 10px;
    height: 465px;
    width: 350px;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.2);
    
    position: fixed;
    
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
    &__icon-settings {
      width: 25px;
      height: 25px;
    }
    &__icon-container {
      border-radius: 5px;
      &:hover {
        background-color: #f0f0f0;
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
