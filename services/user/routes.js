const router = require("express").Router()
const controler = require("./users.controler")
const { validation, createUserValidationRules, updateUserValidationRules } = require('./user.validation')


router.post("/", createUserValidationRules(), validation, controler.create_user)
router.put('/:id', updateUserValidationRules(), validation, controler.update_user);
router.get('/:id', updateUserValidationRules(), validation, controler.get_user);


module.exports = router