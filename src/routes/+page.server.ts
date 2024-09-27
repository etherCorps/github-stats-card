import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AUTH_TOKEN } from '$env/static/private';

export type UserData = {
    login: string;
    name: string;
    avatarUrl: string;
    repos: number;
    createdAt: string;
    contributions?: number; // Optional contributions field
};

export async function load({ fetch, url }): Promise<UserData> {
    let data: UserData = {};
    try {
        const username = url.searchParams.get('username') || '';

        if(!username) {
            error(404, {message: 'Username not found.'})
        }

        const response = await fetch(`https://api.github.com/users/${username}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });

        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            console.error(`Error: ${response.status}`);
            throw new Error(`Error: ${response.statusText}`); 
        }

        data = await response.json() as UserData;

        const contributionResponse = await getContributions(AUTH_TOKEN, username);
        console.log(JSON.stringify(contributionResponse, null, 2));
        if (contributionResponse.ok) {
            const contributionData = await contributionResponse.json();
            console.log(JSON.stringify(contributionData, null, 2));
            data.contributions = contributionData.data.user.contributionsCollection.contributionCalendar.totalContributions;
        }

    } catch (error) {
        throw error; // Rethrow the original error
    }

    return data;
}

async function getContributions(token: string, username: string) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const body = {
        query: `query {
            user(login: "${username}") {
              name
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }`,
    };

    return fetch('https://api.github.com/graphql', {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
    });
}