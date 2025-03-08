import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import UserGrid from "./components/layout/UserGrid";
import { Friends } from "./types/user";
import { getFriends } from "./utils/api";
import "./App.css";

function App() {
  const [users, setUsers] = useState<Friends[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getFriends();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = (newUser: Friends) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar onUserAdded={handleUserAdded} />
      <div className="container mx-auto text-center py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Friends Book
        </h1>
      </div>
      <UserGrid users={users} onRefresh={fetchUsers} loading={loading} />
    </div>
  );
}

export default App;
