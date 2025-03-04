import { Friends } from "../types/user";

const API_BASE_URL = "http://localhost:5000/api";

export const getFriends = async (): Promise<Friends[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/friends`);
    if (!response.ok) {
      throw new Error("Failed to fetch friends");
    }
    const data: Friends[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new Error("Failed to fetch friends");
  }
};

export const addFriend = async (friend: Friends): Promise<Friends> => {
  try {
    const response = await fetch(`${API_BASE_URL}/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friend),
    });
    if (!response.ok) {
      throw new Error("Failed to add friend");
    }
    // Karena server mengembalikan pesan sukses, bukan objek Friend
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw new Error("Failed to add friend");
  }
};

export const updateFriend = async (
  id: number,
  updatedData: Partial<Friends>,
): Promise<Friends> => {
  try {
    const response = await fetch(`${API_BASE_URL}/friends/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Failed to update friend");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating friend:", error);
    throw new Error("Failed to update friend");
  }
};

export const deleteFriend = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/friends/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true; // Mengembalikan true jika berhasil
  } catch (error) {
    console.error("Error deleting friend:", error);
    throw error;
  }
};
