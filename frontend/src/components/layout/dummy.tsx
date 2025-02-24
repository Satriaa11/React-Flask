function UserCard() {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <div className="card-body flex justify-between">
        <div className="avatar">
          <div className="w-12 h-12 rounded">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>

          <div className="flex">
            <div>
              <h3>ASD</h3>
              <h3>ASD</h3>
            </div>
          </div>

          <div className="flex flex-col">
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
        </div>
      </div>
    </div>
  );
}

export default UserCard;
