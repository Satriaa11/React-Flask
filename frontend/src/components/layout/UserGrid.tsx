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
    <div className="flex flex-wrap gap-4 mb-10">
      {loading ? (
        <div className="w-full text-center py-10">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : users.length === 0 ? (
        <div className="w-full text-center py-10 text-gray-500">
          No friends found. Add some friends to see them here.
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="w-[1200px] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] flex justify-center"
          >
            <UserCard user={user} onDelete={onRefresh} />
          </div>
        ))
      )}
    </div>
  );
}

export default UserGrid;
