const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const claimPoints = async (req, res) => {
  try {
    const userId = req.params.id;
    const randomPoints = Math.floor(Math.random() * 10) + 1;  

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.points += randomPoints;
    await user.save();

    const updatedUsers = await User.find().sort({ points: -1 });
    res.json({
      message: `${user.name} was awarded ${randomPoints} points!`,
      users: updatedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUsers = async (req, res) => {
  try {
    const users = [
      { name: 'Rahul' },
      { name: 'Kamal' },
      { name: 'Sanaki' },
      { name: 'Anjali' },
      { name: 'Deepak' },
      { name: 'Suman' },
      { name: 'Prateek' },
      { name: 'Meena' },
      { name: 'Shivani' },
      { name: 'Nikhil' },
    ];

    await User.deleteMany();  
    const createdUsers = await User.insertMany(users);
    res.json(createdUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  claimPoints,
  createUsers,
};
