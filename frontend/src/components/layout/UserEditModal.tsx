import { useState, useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { Friends } from "../../types/user";

interface UserEditModalProps {
  user: Friends;
  onUpdate: (updatedUser: Friends) => void;
}

function UserEditModal({ user, onUpdate }: UserEditModalProps) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [description, setDescription] = useState(user.description);

  // Buat ID modal yang unik berdasarkan ID user
  const modalId = `edit_modal_${user.id}`;

  useEffect(() => {
    // Update state ketika props user berubah
    setName(user.name);
    setRole(user.role);
    setDescription(user.description);
  }, [user]);

  const openModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, name, role, description });
    // Close modal
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-ghost" onClick={openModal}>
        <RiEditBoxLine className="h-5 w-5" />
      </button>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Friend</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base font-bold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Friend's Name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base font-bold">Role</span>
              </label>
              <input
                type="text"
                placeholder="Friend's Role"
                className="input input-bordered w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base font-bold">
                  Description
                </span>
              </label>
              <textarea
                placeholder="Friend's Description"
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-md btn-ghost"
                onClick={() =>
                  (
                    document.getElementById(modalId) as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-md btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default UserEditModal;
