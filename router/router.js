const router = require("express").Router();
const user = require("../services/user/routes")

router.use("/user", user)


module.exports = router