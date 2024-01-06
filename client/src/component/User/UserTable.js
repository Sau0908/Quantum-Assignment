import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import { AiOutlineMessage, AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const UsersTable = ({
  users,
  loggedInUserId,
  selectedUserId,
  messageInput,
  setMessageInput,
  sendMessage,
  handleAddMessage,
  handleViewMessages,
  handleDelete,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date of Birth</th>
          <th>Add Record</th>
          <th>View Record</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user._id}
            style={{
              margin: "4px",
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
            }}
          >
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.dateOfBirth ? user.dateOfBirth.split("T")[0] : ""}</td>
            <td>
              {user._id === loggedInUserId && selectedUserId === user._id ? (
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Enter message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    className="m-2"
                    onClick={sendMessage}
                  >
                    Send
                  </Button>
                </div>
              ) : (
                <AiOutlineMessage
                  onClick={() => handleAddMessage(user._id)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </td>
            <td>
              {loggedInUserId === user._id ? (
                <AiOutlineEye
                  onClick={() => handleViewMessages(user._id)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <AiOutlineEye
                  title="Cannot Able to View"
                  style={{ color: "#ccc" }}
                />
              )}
            </td>
            <td>
              <BsTrash
                onClick={() => handleDelete(user._id)}
                style={{ cursor: "pointer" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
