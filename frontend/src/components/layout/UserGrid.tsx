import { Friends } from "../../types/user";
import UserCard from "./UserCard";

// Definisikan interface untuk props
interface UserGridProps {
  users: Friends[];
  onRefresh: () => void;
  loading?: boolean;
}

function UserGrid({ users, onRefresh, loading = false }: UserGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {loading ? (
        <p className="col-span-3 text-center py-10">
          <span className="loading loading-bars loading-xl"></span>
        </p>
      ) : users.length === 0 ? (
        <p className="col-span-3 text-center py-10 text-gray-500">
          No friends found. Add some friends to see them here.
        </p>
      ) : (
        users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={onRefresh} />
        ))
      )}
    </div>
  );
}

export default UserGrid;
