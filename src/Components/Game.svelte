<script lang="ts">
    import { createEventDispatcher, afterUpdate } from "svelte";

	import type { GamePairs } from "../Components/types/game_pairs";

    import Card from "./Card.svelte";
    import Results from "./Results.svelte";

    export let celebsGamePairs: Array<GamePairs>;
    console.log(celebsGamePairs)

    const dispatch = createEventDispatcher()

    const BASE_URL = "https://cameo-explorer.netlify.app/celebs/"
    const FILE_EXTENSION = ".json" 
    let correctGuess: boolean;
 
    const prices = {
        "a": 0,
        "b": 0
    }



    const check_if_even = () => {
        if(prices.a === prices.b){
            correctGuess = true
        }
        else{
            correctGuess = false
        }
        i += 1
    }

    const check_if_bigger = (choice:string) => { 
        const biggest_value = Object.keys(prices).reduce(function(a, b){ return prices[a] > prices[b] ? prices[a] : prices[b]})
        if(choice == biggest_value){
            correctGuess = true
        }
        else{
            correctGuess = false
        }
        i += 1
    }

    //bangbangbrandon.json
    const load_details = async (celeb) =>{
        const result = await fetch(`${BASE_URL}${celeb.id}${FILE_EXTENSION}`)
        return await result.json()
    }

    let i = 0;

    const promises = celebsGamePairs.map(round => Promise.all([
        load_details(round.a),
        load_details(round.b),
    ]))


    //testing svelte prosime html shit
    // const x = async () => {
    //     let y = await promises[1].then(([e, f]) => console.log(e.name, f.name))
    // }
    // x()

</script>   

<header>
    <p> Tap on the more monetisable celebrity's face || tap the 'same price' button</p>
</header>

<div class="game-container">
    {#await promises[i] then [a,b]}
        <div class="game">
            <div class="card-container"><Card celeb={a} bind:price={prices.a} on:pricecheck={(e) => {check_if_bigger(e.detail.price)}} /></div>
            <div class="same">
                <button on:click={check_if_even}> same price</button>
            </div>
            <div class="card-container"><Card celeb={b} bind:price={prices.b} on:pricecheck={(e) => {check_if_bigger(e.detail.price)}} /></div>

        </div>
    {:catch}
     <p class="error"> Failed to load data</p>
    {/await}
</div>

<div class="results">
    <Results celebsGamePairs={celebsGamePairs.length-1} stage={i} {correctGuess}/>
</div>


<style>
    .game-container{
        width: 100%;
        height: 100%;
        flex: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .game{
        display: flex;
        flex-direction: row;
        flex-shrink: 2;
        justify-content: space-between;
        margin-left: 10%;
        margin-right: 10%;
    }
 
    /* background gif load animation */
    .card-container{
        background-color: blue;
        display: flex;
        position: relative;
    }

    .same{
        display: flex;
        align-self: center;
    }

    .results{
        display: flex;
    }
</style>

