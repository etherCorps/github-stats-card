<script lang="ts">
    import type {PageData} from "./$types";
    import BorderBeam from "./border-beam.svelte";
    export let data;
    console.log(data)
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

<article
        class="flex max-w-xl flex-col items-start justify-between relative rounded-3xl p-7 border border-gray-700/70 bg-background mt-[12%]"
>
    <BorderBeam size={300} duration={7} />
    <div class="flex flex-row h-auto p-4 gap-x-5 rounded-lg border-black items-center justify-center">
        <div class="w-fit">
            <img class="size-32 rounded-lg" src={data.avatarUrl} alt="avatar">
        </div>
        <div class="flex flex-col">
            <a href="" class="text-2xl mb-2">{data.username} ({data.name ?? 'Not available'})</a>
            <div>No of Public repository: {data.repos}</div>
            <div>Created At: {getProfileDateJoined(data)}</div>
            <div>contributions: {data.contributions}</div>
        </div>
    </div>
</article>