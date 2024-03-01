const router = require("express").Router();
const authenticateAdmin = require("../../middleware/auth");


router.get("/protected", authenticateAdmin, (req, res) => {
    res.json({ message: "This is a protected admin route." });
});

module.exports = router;