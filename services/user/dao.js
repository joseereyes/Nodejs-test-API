const user_schema = require("./models")



const create_user = async(user_object) => {
    const userObject = new user_schema(user_object)
    try {
        const new_user = await userObject.save()
        return new_user

    } catch (error) {

        throw new Error(error)
    }

}


const update_user = async(filter_query, new_values) => {

    try {

        const new_user = await user_schema.updateOne(filter_query, { $set: new_values })
        return new_user

    } catch (error) {

        throw new Error(error)
    }

}

const get_user = async(query) => {

    try {
        const found_user = await user_schema.findOne(query)
        return found_user
    } catch (error) {
        throw new Error(error)
    }

}

const get_user_by_id = async(id) => {

    try {
        const found_user = await user_schema.findById(id)
        return found_user
    } catch (error) {
        throw new Error(error)
    }

}




module.exports = { create_user, get_user, update_user, get_user_by_id }