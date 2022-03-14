const dao = require("./dao");
const dto = require("./dto");
const bcrypt = require("bcrypt");

const create_user = async(req, res) => {

    user = req.body

    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = await bcrypt.hash(myPlaintextPassword, salt);
    user.password = hashed_password

    const found_user = await dao.get_user({ "email": user.email })

    if (found_user == null) {

        try {

            const user_created = await dao.create_user(user)
            const cleaned_user = await dto.response_create(user_created)

            res.status(201).json({
                success: true,
                data: cleaned_user,
                message: "Registered successfully"
            })

        } catch (error) {

            res.status(200).json({
                success: false,
                data: null,
                message: { "problem on user controller": error.message }
            })
        }

    } else {

        res.status(200).json({

            succes: false,
            data: null,
            message: "Email already exists"

        })

    }

}


const update_user = async(req, res) => {

    const { id } = req.params
    const values = req.body
    const found_user = await dao.get_user_by_id(id)


    if (found_user !== null) {

        const found_user_id = found_user._id.toString()

        try {

            await dao.update_user({ "_id": found_user_id }, {...values })
            const found_user = await dao.get_user_by_id(id)
            const cleaned_user = await dto.response_create(found_user)
            res.status(200).json({
                success: true,
                data: cleaned_user,
                message: "Updated successfully"
            })

        } catch (error) {

            res.status(200).json({
                success: false,
                data: null,
                message: { "problem on user controller": error.message }
            })
        }

    } else {

        res.status(404).json({

            succes: false,
            data: null,
            message: "User not found"

        })
    }
}


const get_user = async(req, res) => {

    const { id } = req.params

    try {

        const found_user = await dao.get_user_by_id(id)
        const cleaned_user = await dto.response_create(found_user)

        if (found_user !== null) {

            res.status(200).json({
                success: true,
                data: cleaned_user,
                message: "User found successfully"
            })

        } else {

            res.status(404).json({

                succes: false,
                data: null,
                message: "User not found"

            })
        }

    } catch (error) {

        res.status(200).json({
            success: false,
            data: null,
            message: { "problem on controller.get_user": error.message }
        })
    }
}

module.exports = { create_user, update_user, get_user }