import { RiDeleteBin6Line } from "react-icons/ri";
import { Friends } from "../../types/user";

interface UserDeleteModalProps {
  user: Friends;
  onDelete: (userId: number) => void;
}

function UserDeleteModal({ user, onDelete }: UserDeleteModalProps) {
  const modalId = `delete_modal_${user.id}`;
  const openModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const handleDelete = () => {
    onDelete(user.id);
    // Close modal
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-ghost" onClick={openModal}>
        <RiDeleteBin6Line className="h-5 w-5" />
      </button>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Delete Friend</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-bold">{user.name}</span> ? This action cannot
            be undone.
          </p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-md btn-ghost"
              onClick={() =>
                (document.getElementById(modalId) as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-md btn-error"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default UserDeleteModal;
