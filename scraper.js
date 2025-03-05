const axios = require("axios");
const fs = require("fs");

async function getFlightDeals() {
    const url = "https://www.reddit.com/r/traveldeals/top.json?limit=5"; // Reddit travel deals
    try {
        const response = await axios.get(url);
        const deals = response.data.data.children.map(post => ({
            title: post.data.title,
            link: `https://reddit.com${post.data.permalink}`,
            upvotes: post.data.ups
        }));

        // Save to flights.json
        fs.writeFileSync("flights.json", JSON.stringify(deals, null, 2));
        console.log("✅ Flight deals updated!");
    } catch (error) {
        console.error("❌ Error fetching flight deals:", error);
    }
}

getFlightDeals();
