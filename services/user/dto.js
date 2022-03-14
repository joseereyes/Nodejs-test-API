const response_all_users = async(arr) => {
    const allUsers = [arr.map((user) => {
        const { firstName, lastName, email, role, _id } = user
        return {
            _id,
            firstName,
            lastName,
            email,
            role
        }
    })]
    return allUsers
}
const response_create = async(user) => {
    const { firstName, lastName, email, role, _id } = user
    return {
        _id,
        firstName,
        lastName,
        email,
        role
    }
}

module.exports = { response_create, response_all_users }