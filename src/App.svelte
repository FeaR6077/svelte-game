<script lang="ts">
	import { onMount } from "svelte"

	import Game from "./Components/Game.svelte"
	import WelcomeScreen from "./Components/WelcomeScreen.svelte";

	import { createRandomGamePair, filterByCategory } from "./utils/applySelection"

	const cameoData = "https://cameo-explorer.netlify.app/celebs.json"
	
	let state = "welcome" // or play

	let gameData: any;

	const lookup = new Map()
	const subset = new Set()

	let celebsGamePairs;


	const fetchGameData = async () => {
		const response = await fetch(cameoData)
		gameData = await response.json()
	}

	const startGame = (e) => {
		state = "playing"
		celebsGamePairs = createRandomGamePair(filterByCategory(subset, e.detail.category))
	}

	onMount( async () => {
		await fetchGameData()

		gameData.forEach(x => { 
				lookup.set(x.id , x)
			})

		lookup.forEach(x => {
			if(x.reviews >= 50){
				subset.add(x)
			}
			x.similar.forEach(id => {
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
