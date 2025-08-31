import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function handler(event) {
  try {
    const endpoint = event.queryStringParameters.endpoint;
    if (!endpoint) throw new Error("Missing 'endpoint' query parameter");

    const params = { ...event.queryStringParameters };
    delete params.endpoint;

    console.log("Params sent to GitHub:", params);

    const url = endpoint.startsWith("/")
      ? `https://api.github.com${endpoint}`
      : `https://api.github.com/${endpoint}`;

    const { data } = await axios.get(url, {
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
    console.error("Function error:", error.response?.data || error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify(error.response?.data || { message: error.message }),
    };
  }
}
