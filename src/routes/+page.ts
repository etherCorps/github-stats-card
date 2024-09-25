export type UserData = {
    username: string;
    name: string;
    avatar_url: string;
    repos: number;
    created_at: string;
    contributions: number;
}
export const load =( async({fetch,url})=>{
    const username = url.searchParams.get('username')||'';
const response = await fetch(`https://api.github.com/users/${username}`);
const data = await response.json();

const Conresponse = await fetch(`https://api.github.com/users/${username}/events/public`);
const contributions = await Conresponse.json();
// console.log(data);
const UserData:UserData = {
    username: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
    repos: data.public_repos,
    created_at: data.created_at,
    contributions: contributions.length
}

return UserData;
})