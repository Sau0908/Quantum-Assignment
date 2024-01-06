import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import MessagesModal from "./MessagesModal";
import UsersTable from "./UserTable";
import { BsBoxArrowRight } from "react-icons/bs";
import { AuthContext } from "../../AuthContext";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [viewMessages, setViewMessages] = useState([]);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setLoggedInUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      if (userId !== loggedInUserId) {
        console.log("You are not authorized to delete this user");
        toast.error("Not authorized to delete this user");
        return;
      }
      await axios.delete(`http://localhost:5000/users/${userId}`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      console.log(`User with ID ${userId} deleted successfully`);
      toast.success("User Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddMessage = async (userId) => {
    try {
      if (userId !== loggedInUserId) {
        console.log("You are not authorized to add a message for this user");
        toast.error("Not authorized to add a message for this user");
        return;
      }
      setSelectedUserId(userId);
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const sendMessage = async () => {
    try {
      if (!messageInput) {
        console.log("Message cannot be empty");
        toast.error("Message cannot be empty");
        return;
      }

      await axios.post("http://localhost:5000/users/addmessages", {
        userId: selectedUserId,
        message: messageInput,
      });

      setMessageInput("");
      setSelectedUserId("");
      console.log(
        `Message sent successfully for user with ID ${selectedUserId}`
      );
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleViewMessages = async (userId) => {
    try {
      if (userId !== loggedInUserId) {
        console.log("You are not authorized to view messages for this user");
        toast.error("Not authorized to view messages for this user");
        return;
      }
      console.log(userId);
      const response = await axios.get(
        `http://localhost:5000/users/${userId}/messages`
      );
      console.log("hello world");
      const userMessages = response.data.messages;
      setViewMessages(userMessages);
      setShowMessagesModal(true);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const handleLogout = () => {
    try {
      logout();
      toast.success("User Logout!");
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">User List</h2>
      <UsersTable
        users={users}
        loggedInUserId={loggedInUserId}
        selectedUserId={selectedUserId}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
        handleAddMessage={handleAddMessage}
        handleViewMessages={handleViewMessages}
        handleDelete={handleDelete}
      />

      <MessagesModal
        show={showMessagesModal}
        handleClose={() => setShowMessagesModal(false)}
        messages={viewMessages}
      />
      <div className="fixed-bottom d-flex justify-content-end p-3">
        <Button variant="secondary" onClick={handleLogout}>
          Logout <BsBoxArrowRight />
        </Button>
      </div>
    </Container>
  );
};

export default User;
