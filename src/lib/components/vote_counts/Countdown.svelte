<script lang="ts">
import { DateTime, Duration } from 'luxon'
	import { onMount } from 'svelte';

export let endBlock = 0;
export let scaleFactor:number = 1;
let end= DateTime.local();
let now: any = DateTime.local();
let moreThanDay:boolean;


$: display = (end && now) ? Duration.fromObject(end.diff(now).toObject()) : undefined; //.toFormat('dd hh:mm:ss');

onMount(async () => {
    try {
        const dayInMillis = 1000 * 60 * 60 * 24;
        const blockProdTime = (scaleFactor) ? (10 * scaleFactor) : 10
        end= DateTime.local().plus({ minutes: endBlock * blockProdTime });
        //let end= DateTime.local().plus({ days: 900 });
        moreThanDay = (end.toMillis() - now.toMillis()) > dayInMillis;
        const myInt =  setInterval(() => {
            now = DateTime.local();
        }, 1000)
    } catch (err:any) {
        console.error('error in countdown: ', err)
    }
})

</script>

{#if display && endBlock > 0}
<div class="inline-block">
    {#if moreThanDay}
    ~ {display.toFormat("d ' days' h ' hrs' m ' mins' ss ' secs'")}
    {:else}
    ~ {display.toFormat("h ' hrs' m ' mins' ss ' secs'")}
    {/if}
 </div>
 {/if}

<style>
</style>
