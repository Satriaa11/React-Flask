import { MdOutlineLibraryAdd } from "react-icons/md";
import { useState } from "react";
import { addFriend } from "../../utils/api";
import { Friends } from "../../types/user";

interface UserCreateModalProps {
  onUserAdded: (newUser: Friends) => void;
}

function UserCreateModal({ onUserAdded }: UserCreateModalProps) {
  const [isLoading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });
  const openModal = () => {
    const modal = document.getElementById(
      "create_modal",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    const toast = document.createElement("div");
    toast.className = `toast toast-top toast-end`;

    const alert = document.createElement("div");
    alert.className = `alert ${type === "success" ? "alert-success" : "alert-error"}`;
    alert.innerHTML = `<span>${message}</span>`;

    toast.appendChild(alert);
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newFriend = {
        ...inputs,
        id: 0,
      };
      const result = await addFriend(newFriend);
      if (result) {
        // Reset form inputs
        setInputs({
          name: "",
          role: "",
          description: "",
          gender: "",
        });

        // Show success toast
        showToast(`Successfully added ${result.name} as a friend!`, "success");

        // Panggil fungsi callback untuk memperbarui daftar user
        onUserAdded(result);
      }

      // Close modal
      const modal = document.getElementById(
        "create_modal",
      ) as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }

      // Hapus baris ini karena kita sudah menggunakan onUserAdded
      // setUsers((prevUsers) => [...prevUsers, data]);

      setLoading(false);
    } catch (error) {
      console.error("Failed to create user:", error);
      showToast("Failed to add friend. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-ghost" onClick={openModal}>
        <MdOutlineLibraryAdd className="h-5 w-5" />
      </button>

      <dialog id="create_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Add New Friend 😀</h3>
          <form onSubmit={handleSubmit}>
            <div className="pt-7 pb-5  flex flex-row justify-between gap-2">
              <div className="flex flex-col ">
                <label className="label">
                  <span className="label-text font-bold text-base">Name </span>
                </label>{" "}
                <input
                  type="text"
                  placeholder="Friend's Name"
                  className="input input-bordered w-full"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label className="label">
                  <span className="label-text font-bold text-base">Role </span>
                </label>
                <input
                  type="text"
                  placeholder="Friend's Role"
                  className="input input-bordered w-full"
                  value={inputs.role}
                  onChange={(e) =>
                    setInputs({ ...inputs, role: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control max-w-full">
              <label className="label">
                <span className="label-text font-bold text-base">
                  Description
                </span>
              </label>
              <textarea
                placeholder="Friend's Description"
                className="textarea textarea-bordered w-full h-36"
                value={inputs.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-row pt-7">
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <span className="label-text">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="radio checked:bg-blue-500"
                    checked={inputs.gender === "male"}
                    onChange={() => setInputs({ ...inputs, gender: "male" })}
                    required
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <span className="label-text">Female</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="radio checked:bg-blue-500"
                    checked={inputs.gender === "female"}
                    onChange={() => setInputs({ ...inputs, gender: "female" })}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-4 pt-8">
              <button
                type="button"
                className="btn btn-md btn-ghost"
                onClick={() =>
                  (
                    document.getElementById("create_modal") as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-md btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Friend"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default UserCreateModal;
