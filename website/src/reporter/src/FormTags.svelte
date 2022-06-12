<script lang="ts">
  import { onMount } from "svelte";
  import type { Tag } from "./Form.svelte";
  import CheckboxChecked from "./assets/checkbox_marked.svg";
  import Checkbox from "./assets/checkbox_blank.svg";

  export let loadTags: () => void;
  export let tags: Tag[];
  export let checkTag: (id: number) => void;

  onMount(() => {
    if (tags.length === 0) {
      loadTags();
    }
  });
</script>

<div class="tags">
  {#each tags as tag}
    <div
      class="tag-container"
      style={`background-color: ${tag.color}`}
      on:click={() => checkTag(tag.id)}
    >
      <img
        src={tag.checked ? CheckboxChecked : Checkbox}
        alt=""
        class="tag-container__checkbox"
      />
      <div class="tag-container__text">{tag.name}</div>
    </div>
  {/each}
</div>

<style lang="scss">
  .tags {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .tag-container {
    display: flex;
    align-items: center;

    border-radius: 5px;
    width: 100px;
    user-select: none;
    cursor: pointer;
    &__checkbox {
    }

    &__text {
      color: black;
    }
  }
</style>
