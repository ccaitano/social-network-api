const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res){
        
    },
    // Get a single thought by ID
    getThoughtByID({ params }, res) {

    },
    // Create a new thought
    createThought({ params, body}, res) {

    },
    // Update an existing thought by ID
    updateThought({ params, body}, res) {

    },
    // Delete an existing thought by ID
    removeThought({ params }, res) {

    },
    // Add a reaction to a thought
    addReaction({params, body}, res) {

    },
    // Delete a reaction from a thought
    removeReaction({ params }, res) {

    }
};

module.exports = thoughtController;