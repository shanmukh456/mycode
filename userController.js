
const User = require('./User');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

   

    const { token, user } = await User.login(username, password);

    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    

    const newUser = await User.register(username, password);

    res.status(201).json({
      message: 'Registration successful',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

   

    const userProfile = await User.getProfile(username);

    if (userProfile) {
      res.status(200).json({
        message: 'User profile retrieved successfully',
        user: userProfile,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const updatedData = req.body;

   
    const updatedUser = await User.updateProfile(username, updatedData);

    res.status(200).json({
      message: 'User profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Update failed' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;

   
    await User.delete(username);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Deletion failed' });
  }
};

module.exports = {
  login,
  register,
  getProfile,
  updateProfile,
  deleteUser,
  
};
