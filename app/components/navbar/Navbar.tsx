// Import the SafeUser type from the app types file
import { SafeUser } from "@/app/types";

// Import the Categories, Container, Logo, Search, and UserMenu components
import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

// Define the prop types for the Navbar component
interface NavbarProps {
  currentUser?: SafeUser | null;
}

// Define the Navbar component
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
           border-gray-300 border-b-[1px]
          
        "
      >
        {/* Add a container to hold the logo, search bar, and user menu */}
        <Container>
          <div 
            className="
              flex 
              flex-row 
              items-center 
              justify-between
              gap-3
              md:gap-0
            "
          >
            {/* Display the site logo */}
            <Logo />

            {/* Display the search bar */}
            <Search />

            {/* Display the user menu */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      {/* Display the categories */}
      <Categories />
    </div>
  );
}

// Export the Navbar component as the default export
export default Navbar;
