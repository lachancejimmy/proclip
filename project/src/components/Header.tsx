
import ThemeToggleButton from './ui/ThemeToggleButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow">
      <h1 className="text-xl font-bold">Mon Application</h1>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
