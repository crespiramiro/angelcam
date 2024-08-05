
const Header = ({ onLogout }) => {
  return (
    <header className="w-full bg-blue-500 py-8 px-16 text-white flex justify-between items-center">
      <h1 className="text-3xl font-bold">Angelcam</h1>
      <button
        onClick={onLogout}
        className="bg-white text-blue-500 px-4 py-3 font-semibold rounded-md hover:bg-gray-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
