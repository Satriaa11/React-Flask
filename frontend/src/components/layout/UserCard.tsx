import { RiDeleteBin6Line } from "react-icons/ri";
import { User } from "../../types/user"; // Asumsikan Anda memiliki tipe User
import UserEditModal from "./UserEditModal";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl">
      <div className="header-container card-body">
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={
                    user.avatar ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm opacity-70">{user.role}</p>
            </div>
          </div>
          <div className="card-actions mb-6">
            {/* <button className="btn btn-sm btn-ghost">
            //   <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     fill="none"
            //     viewBox="0 0 24 24"
            //     strokeWidth={1.5}
            //     stroke="currentColor"
            //     className="w-5 h-5"
            //   >
            //     <path
            //       strokeLinecap="round"
            //       strokeLinejoin="round"
            //       d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            //     />
            //   </svg>
            </button> */}

            <UserEditModal />
            <button className="btn btn-sm btn-ghost">
              <RiDeleteBin6Line className="h-5 w-5" />
            </button>
          </div>{" "}
        </div>
        <div className="body-container description mt-2">
          <p>{user.description}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
