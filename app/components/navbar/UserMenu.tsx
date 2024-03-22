'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  // this basically just talgles the open dropdown stuff to true or false
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
      <Link
  href="/alllistings"
  className="
    hidden
    md:block
    text-gray-800
   
    
    active:bg-green-700 
    font-semibold 
    py-3 
    px-4 
    rounded-full 
    transition 
    cursor-pointer
  "
>
  View All Properties
</Link>
      <div 
  onClick={onRent}
  className="
    hidden
    md:block
    text-white
    bg-green-500 
    hover:bg-green-600 
    active:bg-green-700 
    font-semibold 
    py-3 
    px-4 
    rounded-full 
    transition 
    cursor-pointer
  "
>
  Rent Your Property
</div>

        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-gray-300 border-[1px] 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu color="#777" />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-[ghostwhite]
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="My bookings" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="My Listings" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Rent a property" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Create Account" 
                  onClick={registerModal.onOpen}
                />
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;