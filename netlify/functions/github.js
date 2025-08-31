import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // safe, server-side only

export async function handler(event) {
  try {
    const endpoint = event.queryStringParameters.endpoint;

    // Remove endpoint from query params
    const params = { ...event.queryStringParameters };
    delete params.endpoint;

    const { data } = await axios.get(`https://api.github.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      params,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify(error.response?.data || { message: error.message }),
    };
  }
}
