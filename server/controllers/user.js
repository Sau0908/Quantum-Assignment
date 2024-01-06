import UserModel from "../models/authSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const userList = await UserModel.find();

    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log("userId ", userId);

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    console.log("deleted User ", deleteUser);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User deleted successfully:", deletedUser);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addMessage = async (req, res) => {
  const { userId, message } = req.body;
  console.log("message", message);

  try {
    const user = await UserModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.messages.push(message);
    await user.save();

    res.status(200).json({ message: "Message added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserMessages = async (req, res) => {
  const userId = req.params.id;
  console.log("first vala ", userId);
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userMessages = user.messages;
    res.status(200).json({ messages: userMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error while fetching messages" });
  }
};
