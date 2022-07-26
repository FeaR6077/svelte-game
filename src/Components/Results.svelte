<script lang="ts">
    import { onMount } from "svelte";
    import { beforeUpdate } from 'svelte';

    import ResultCard from "./ResultCard.svelte";

    export let celebsGamePairs
    export let stage
    export let correctGuess
    
    let results = [];

    $: if(correctGuess, stage){
            results[stage -1] = {stage: correctGuess}, console.log(results)}

    $: console.log(stage, correctGuess)


    onMount(() => {
        for(let i = 1; i <= celebsGamePairs; i++){
            results.push(
                {i: "undefined"}
            )
        }
    })

</script>