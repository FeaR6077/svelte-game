<script lang="ts">
	import { onMount } from "svelte"

	import Game from "./Components/Game.svelte"
	import WelcomeScreen from "./Components/WelcomeScreen.svelte";

	import type { Celebrity } from "./Components/types/game_data_type";
	import type { GamePairs } from "./Components/types/game_pairs";

	import { createRandomGamePair, filterByCategory } from "./utils/applySelection"

	const cameoData = "https://cameo-explorer.netlify.app/celebs.json"
	
	let state = "welcome" // or play
	let gameData: Array<Celebrity>;

	const lookup = new Map()
	const subset = new Set()

	let celebsGamePairs: Array<GamePairs>;


	const fetchGameData = async () => {
		const response = await fetch(cameoData)
		gameData = await response.json() as Array<Celebrity>
	}

	const startGame = (e) => {
		state = "playing"
		celebsGamePairs = createRandomGamePair(filterByCategory(subset, e.detail.category)) ;
	}

	onMount( async () => {
		await fetchGameData()

		gameData.forEach(celeb => { 
				lookup.set(celeb.id , celeb)
			})

		lookup.forEach(celeb => {
			if(celeb.reviews >= 50){
				subset.add(celeb)
			}
			celeb.similar.forEach(id => {
				subset.add(lookup.get(id))

			})
		})
	
		return{
			celebs: Array.from(subset),
			lookup
		}


	})

</script>

<main>

	{#if state === "welcome"}
	<WelcomeScreen on:selection={startGame}/>
	{:else}
	<Game {celebsGamePairs} on:welcome={() => {state="welcome"}}/>
	{/if}
</main>



<style>

	main{
		font-size: 800;
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

</style>
