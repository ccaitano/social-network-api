const { User, Thought } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Get a singlie user by ID
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Create a new user
    createNewUser(req , res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Update an existing user
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {runValidators: true, new: true})
            .then(userData => {
                if(userData) {
                    res.json(userData);
                } else {
                    res.status(400).json({message: 'No User Found with This ID!'})
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Delete existing user
    removeUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
            .then(userData => {
                if(userData){
                    res.json(userData);
                } else {
                    res.status(400).json({message: 'No User Found with This ID!'})
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Add a new friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then(userData => {
                if(userData) {
                    res.json(userData);
                } else {
                    res.status(400).json({message: 'No User Found with This ID!'})
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Delete an exisiting friend
    removeFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.id },
            { $pull: { friends: { friendId: req.params.friendsId }}},
            { runValidators: true, new: true}
        )
            .then(userData => {
                if(userData){
                    res.json(userData);
                } else {
                    res.status(400).json({ message: 'No User Found with This ID!'})
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    }
};

module.exports = userController;