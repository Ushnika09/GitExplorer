import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

// Access token from .env 
const GITHUB_TOKEN = import.meta.env.VITE_PERSONAL_ACCESS_TOKEN;


// Create a reusable axios client
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});


export default async function githubGet(endpoint, params = {}) {
  try {
    const { data } = await githubApi.get(endpoint, { params });
    return data;
  } catch (error) {
    console.error("GitHub API error:", error.response?.data || error.message);
    throw error;
  }
}
