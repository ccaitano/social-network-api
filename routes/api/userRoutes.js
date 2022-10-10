const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/users');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);

router.route('/:id/friends')
    .post(addFriend);

router.route('/:id/friends/:friendsId')
    .delete(removeFriend);

module.exports = router;