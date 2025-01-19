const {responseModal} = require("../models/ResponseCode") 
const getFilteredCodes = async (req, res) => {
  const { filter } = req.query;

  if (!filter) {
    return res.status(400).json({ error: "Filter parameter is required." });
  }
  try {
    // Build regex for filtering
    const regex = new RegExp(`^${filter.replace("x", "\\d")}$`);

    // Find matching response codes
    const results = await responseModal.find({ code: { $regex: regex } });
    console.log({results})

    if (results.length === 0) {
      return res.status(404).json({ message: "No matching response codes found." });
    }

    // Return matched results
    res.status(200).json(results);
  } catch (err) {
    console.error("Error in search API:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { getFilteredCodes };
