<script lang="ts">
  import type { PageData } from "./$types";

    export let data;

    const getProfileDateJoined = function (data: PageData): string {
    const s = (unit: number) => {
        return unit === 1 ? '' : 's';
    };

    const now = Date.now();
    const created = new Date(data.createdAt);
    const diff = new Date(now - created.getTime());
    const years = diff.getUTCFullYear() - new Date(0).getUTCFullYear();
    const months = diff.getUTCMonth() - new Date(0).getUTCMonth();
    const days = diff.getUTCDate() - new Date(0).getUTCDate();
    return years
        ? `${years} year${s(years)} ago`
        : months
        ? `${months} month${s(months)} ago`
        : `${days} day${s(days)} ago`;
};
</script>

<div class="flex flex-col justify-center items-center mt-48 ">
    <div class="flex flex-row w-2/4 h-auto p-4 border-[1px] justify-between rounded-lg border-black">
        <div class="flex flex-col">
            <h1 class="text-2xl mb-2">{data.login}({data.name})</h1>
            <div >No of Public repository: {data.public_repos}</div>
            <div >Created At: {getProfileDateJoined(data)}</div>
            <div >contributions: {data.contributions}</div>
        </div>
       <div>
        <img class=" w-20" src={data.avatar_url} alt="avatar">
    </div>
    </div>
 </div>