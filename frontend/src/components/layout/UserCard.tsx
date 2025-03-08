import { Friends } from "../../types/user";
import UserEditModal from "./UserEditModal";
import { useState } from "react";
import UserDeleteModal from "./UserDeleteModal";
import { deleteFriend, updateFriend } from "../../utils/api";

// Tambahkan onDelete ke props
interface UserCardProps {
  user: Friends;
  onDelete?: () => void; // Buat opsional dengan tanda ?
}

const UserCard = ({ user: initialUser, onDelete }: UserCardProps) => {
  const [user, setUser] = useState(initialUser);

  // Fungsi untuk menampilkan toast
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning",
  ) => {
    // Buat elemen toast
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} fixed top-4 right-4 z-50 w-auto max-w-sm shadow-lg`;

    // Isi konten toast
    toast.innerHTML = `
      <div>
        <span>${message}</span>
      </div>
    `;

    // Tambahkan ke DOM
    document.body.appendChild(toast);

    // Hapus toast setelah 3 detik
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-500");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  };

  const handleUpdateUser = async (updatedUser: Friends) => {
    try {
      const result = await updateFriend(updatedUser.id, updatedUser);
      if (result) {
        setUser(result);
        showToast(`Data ${user.name} berhasil diperbarui!`, "success");
      }
    } catch (error) {
      console.error("Failed to update user", error);
      showToast(`Gagal memperbarui data ${user.name}`, "error");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteFriend(user.id);

      // Tampilkan toast sukses
      showToast(`${user.name} berhasil dihapus dari daftar teman!`, "success");

      // Panggil onDelete callback jika tersedia
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Failed to delete user", error);
      // Tampilkan toast error
      showToast(`Gagal menghapus ${user.name}`, "error");
    }
  };

  return (
    <div className="card card-compact bg-base-300 w-full shadow-xl h-full">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={
                    user.img_url ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-sm opacity-70">{user.role}</p>
            </div>
          </div>
          <div className="card-actions">
            <UserEditModal user={user} onUpdate={handleUpdateUser} />
            <UserDeleteModal
              user={user}
              onDelete={() => {
                // Panggil fungsi handleDeleteUser untuk menghapus user
                handleDeleteUser();
              }}
            />
          </div>
        </div>
        <div className="description mt-4">
          <p className="text-sm md:text-base line-clamp-3 md:line-clamp-4">
            {user.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
