import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AUTH_TOKEN } from '$env/static/private';
import {DEFAULT_USERNAME} from "$lib/utils";

export type UserData = {
    username: string; // login
    name: string; // name
    avatarUrl: string; // avatar_url
    repos: number; // public_repo
    createdAt: string; // created_at
    contributions?: number; // Optional contributions field
};

type ReturnHelper = {
    status: number
    error: boolean
    userData?: UserData;
    message?: string
}

function returnHelper(data: ReturnHelper) {
    return data
}

async function request(url: string, method: string = 'GET', body?: Record<string, any>) {
    const requestInit: RequestInit = {
        method,
        headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
        }
    }

    if (body) {
        requestInit.body = JSON.stringify(body);
    }

    return fetch(url, requestInit)
}

export const load: PageServerLoad = async ({ fetch, url }) => {
    const username = url.searchParams.get('username') || DEFAULT_USERNAME;
    try {
        const [userDataResponse, contributionResponse] = await Promise.all([
            request(`https://api.github.com/users/${username}`),
            getContributions(username)]
        )

        if (!userDataResponse.ok || !contributionResponse.ok) {
            return returnHelper({
                status: !userDataResponse.ok ? userDataResponse.status : contributionResponse.status,
                error: true,
                message: !userDataResponse.ok ? userDataResponse.statusText : contributionResponse.statusText,
            })
        }

        const [userDataJson, contributionsJson] = await Promise.all([
            userDataResponse.json(), contributionResponse.json()
        ])

        return returnHelper({
            status: 200,
            error: false,
            userData: {
                contributions: contributionsJson.data.user.contributionsCollection.contributionCalendar.totalContributions,
                avatarUrl: userDataJson.avatar_url,
                username: userDataJson.login,
                repos: userDataJson.public_repos,
                createdAt: userDataJson?.created_at,
                name: userDataJson.name
            }
        })
    } catch (error) {
        throw error; // Rethrow the original error
    }
}

async function getContributions(username: string) {
    return request("https://api.github.com/graphql", "POST", {
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
    })
}