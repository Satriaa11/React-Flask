import { User } from "../../types/user";
import UserCard from "./UserCard";

function UserGrid({ users }: { users: User[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserGrid;
