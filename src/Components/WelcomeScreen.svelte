<script lang="ts">

    import { createEventDispatcher, onMount } from "svelte"

    const dispatch = createEventDispatcher()

    const categories = [
        {slug: "actors", label: "Actors"},
        {slug: "athletes", label: "Athletes"},
        {slug: "comedians", label: "Comedians"},
        {slug: "creators", label: "Creators"},
        {slug: "models", label: "Models"},
        {slug: "musicans", label: "Musicans"},
        {slug: "reality-tv", label: "Reality TV"}
    ]

    let selected = false

    const handleSelection = (category) => {
        dispatch("selection", {category})
        selected = true
    }

</script>

<h1>G<span class="logo">a</span>meDay</h1>

<p> Pick a category to play the Game</p>

<div class="game-selection">
    {#each categories as category (category.slug)}
    <button on:click={() => handleSelection(category)} disabled={selected}>{category.label}</button>
{/each}
</div>



<style>
    h1{
        color: red;
        text-transform: uppercase;
        font-size: 5em;
    }

    .logo{
        display: inline-block;
        background: url(/icons/compare.svg) 50% 50% no-repeat;
        background-size: 100%;
        transform: scale(1.4);
        text-indent: -9999px;
        width: 1em;
    }

    .game-selection{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 40em;
    }
</style>