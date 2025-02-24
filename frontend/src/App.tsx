import { USERS } from "./components/data/dummy";
import Navbar from "./components/layout/Navbar";
import UserGrid from "./components/layout/UserGrid";

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <UserGrid users={USERS} />
    </div>
  );
}

export default App;
