<script lang="ts">
	import { onMount } from "svelte";
	
	let value = "<h1>Noice going, genois!";
	let preview: HTMLIFrameElement;

	onMount(refresh);

	function refresh(){
		const { contentDocument } = preview;
		contentDocument?.open();
		contentDocument?.write(value);
		contentDocument?.close();
	}
</script>

<style>
	textarea {
		width: 32ch;
		height: 16ch;
	}
</style>

<textarea bind:value={value} on:input={refresh}></textarea>
<iframe bind:this={preview} title="preview"></iframe>