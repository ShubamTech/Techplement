const app = require("../server"); // Import the Express app

export default (req, res) => {
  return app(req, res); // Convert Express app to a Vercel function
};
