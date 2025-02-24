import { MdOutlineLibraryAdd } from "react-icons/md";
import { useState } from "react";

function UserCreateModal() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("male");
  const openModal = () => {
    const modal = document.getElementById(
      "my_modal_3",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, role, description, gender });
    // Reset form fields
    setName("");
    setRole("");
    setDescription("");
    setGender("male");
    // Close modal
    const modal = document.getElementById(
      "my_modal_3",
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <button className="btn" onClick={openModal}>
        <MdOutlineLibraryAdd className="h-5 w-5  " />
      </button>
      <dialog id="my_modal_3" className="modal">
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
                <label className="mb-2 font-bold">Add Friend:</label>
                <input
                  type="text"
                  placeholder="Friend's Name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label className="mb-2 font-bold">Role:</label>
                <input
                  type="text"
                  placeholder="Friend's Role"
                  className="input input-bordered w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-bold">Description:</label>
              <input
                type="text"
                placeholder="Friend's Description"
                className="input input-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
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
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-row justify-end gap-2 pt-8">
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() =>
                  (
                    document.getElementById("my_modal_3") as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                Add Friend
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default UserCreateModal;
