<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let celeb;
    export let price = celeb.price

    const dispatch = createEventDispatcher()

    price = celeb.price

</script>

<div class="outer-card">
    <button class="inner-card" style="background-image: url({celeb?.image})" on:click={() => dispatch("pricecheck",{"price": price})}>
        <div class="details">
            <h2>{celeb.name}</h2>
            <p class="type">{celeb.type}</p> 
        </div>
    </button>
</div>

<style>
    .outer-card{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-content: center;
    }

    .inner-card{
        width: 30em;
        height: 30em;
        background: 50% 50% no-repeat;
        background-size: cover;
        overflow: hidden;
    }

    .details{
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 1em 0.5em 0.5;
        background: linear-gradient(to bottom, transparent);
        color: white;
    }

    h2{
        margin-bottom: 0.2em;
        color: blanchedalmond;
    }

    .type{
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (min-width: 640px){
        .outer-card{
            height: 0;
            padding-bottom: 100%;
        }
    }
</style>