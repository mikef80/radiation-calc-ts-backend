const db = require("../db/connection"); // Import your PostgreSQL connection

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user is logged in, and you have set up the user object in the request

    const result = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const user = result.rows[0];

    res.render("userProfile", { user }); // Assuming you are using a template engine like EJS
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
