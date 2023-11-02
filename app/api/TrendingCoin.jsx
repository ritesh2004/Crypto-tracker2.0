import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const MAX_REQUESTS_PER_MINUTE = 30; // Adjust as needed based on the API's rate limits
let requestsThisMinute = 0;
let lastRequestTimestamp = 0;

export const TrendingCoin = async (currency) => {
  const now = Date.now();

  // Check if we've exceeded the rate limit for this minute
  if (requestsThisMinute >= MAX_REQUESTS_PER_MINUTE && now - lastRequestTimestamp < 60000) {
    // Delay the request for the next minute
    const waitTime = 60000 - (now - lastRequestTimestamp);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  try {
    const { data } = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: 'gecko_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage:'24h',
      },
    });

    // Update rate limiting variables
    requestsThisMinute++;
    lastRequestTimestamp = now;

    return data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handle rate-limiting error by retrying
      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve(TrendingCoin(currency));
        }, 60000); // Retry after 1 minute
      });
    } else {
      throw error;
    }
  }
};
