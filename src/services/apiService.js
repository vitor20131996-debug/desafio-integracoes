const axios = require("axios");

async function fetchUsers() {
  const response = await axios.get("https://randomuser.me/api/?results=150");
  return response.data.results;
}

module.exports = { fetchUsers };
