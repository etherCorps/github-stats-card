<script lang="ts">
   import type { PageData } from "./$types";
   import { goto } from '$app/navigation';
   import { page } from '$app/stores';
  import Card from "./card.svelte";
   export let data: PageData;
   // console.log(data);
   let username:string;


   const updateSearchParams = (key:string,value:string)=>{
    const searchParams = new URLSearchParams($page.url.search);
    searchParams.set(key,value);
    goto(`?${searchParams.toString()}`);
 };
</script>
<form class="flex flex-row justify-center gap-2 mt-4" on:submit|preventDefault={()=>updateSearchParams('username',username.toString())}>
   <input class=" w-48 border-[1px] border-gray-300 rounded-md p-2" type="text" bind:value={username} placeholder="Username">
   <input class="border-[1px] border-gray-300 rounded-md p-2 cursor-pointer bg-blue-700 text-white"  type="submit">
</form>

{#if data.username}
<Card {data}/>
{/if}
 