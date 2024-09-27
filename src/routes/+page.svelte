<script lang="ts">
    import type {PageData} from "./$types";
    import {goto} from '$app/navigation';
    import {page} from '$app/stores';
    import ProfileCard from "./card.svelte";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import { queryParam } from 'sveltekit-search-params';

    export let data: PageData;
    const username = queryParam('username');
    const updateSearchParams = (value: string) => {
        if (!value) return;
        username.set(value);
    };
</script>
<div class="flex flex-col items-center justify-center max-h-screen">
    <form class="flex flex-row justify-center gap-2 mt-4"
          on:submit|preventDefault={() =>
         updateSearchParams($username || '')
      }>
        <input class=" w-48 border-[1px] border-gray-300 rounded-md p-2" type="text" on:change={(e) => $username = e.target.value}
               placeholder="Username">
        <input class="border-[1px] border-gray-300 rounded-md p-2 cursor-pointer bg-blue-700 text-white" type="submit">
    </form>

    {#if !data.error}
        <ProfileCard data={data.userData}/>
    {:else }
        <div class="flex flex-col justify-center items-center mt-48 ">
            <Alert.Root variant="destructive" class="max-w-3xl">
                <Alert.Title>Error - {data.status}</Alert.Title>
                <Alert.Description>{data.message}</Alert.Description>
            </Alert.Root>
        </div>
    {/if}
</div>
 