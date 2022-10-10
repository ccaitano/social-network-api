const { User, Thought } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res){
        Thought.find()
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get a single thought by ID
    getThoughtById(req , res) {
        Thought.findOne({ _id: req.params.id })
            .then(thoughtData => {
                if(thoughtData) {
                    res.json(thoughtData);
                } else {
                    res.status(400).json({message: 'No Thought Associated with This ID!'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(userData => {
                if(userData) {
                    res.json(userData);
                } else {
                    res.status(400).json({message: 'No User with This ID!'});
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Update an existing thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true}
            )
            .then(thoughtData => {
                if(thoughtData) {
                    res.json(thoughtData);
                } else {
                    res.status(400).json({message: 'No Thought Associated with This ID!'});
                };
            })
    },
    // Delete an existing thought by ID
    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(thoughtData => {
                if(thoughtData){
                    res.json(thoughtData);
                } else {
                    res.status(400).json({message: 'No Thought Associated with This ID!'});
                };
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then(thoughtData => {
                if(thoughtData) {
                    res.json(thoughtData);
                } else {
                    res.status(400).json({message: 'No Thought Associated with This ID!'});
                };
            })
    },
    // Delete a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionsId: req.params.reactionsId }}},
            { runValidators: true, new: true }
        )
            .then(thoughtData => {
                if(thoughtData) {
                    res.json(thoughtData);
                } else {
                    res.status(400).json({message: 'No Thought Associated with This ID!'});
                };
            })
    }
};

module.exports = thoughtController;