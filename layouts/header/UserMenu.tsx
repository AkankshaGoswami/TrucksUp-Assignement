import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import Link from "next/link";
import { IconLogin2 } from "@tabler/icons-react";

import { Avatar } from "components/common/Avatar";
import { getAssetPath } from "helper/assetPath";

import { useRouter } from "next/navigation";

interface UserToggleProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
const CustomToggle = React.forwardRef<HTMLAnchorElement, UserToggleProps>(
  ({ children, onClick }, ref) => (
    <Link ref={ref} href="#" onClick={onClick}>
      {children}
    </Link>
  )
);

const UserMenu = () => {
  const router = useRouter();

  // ✅ Logout Function
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    localStorage.removeItem("username");
    router.push("/");
  };

  const username=localStorage.getItem("username");

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <Avatar
          type="image"
          src={getAssetPath("/images/avatar/avatar-1.jpg")}
          size="sm"
          alt="User Avatar"
          className="rounded-circle"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="p-0 dropdown-menu-md">
        <div className="d-flex gap-3 align-items-center border-dashed border-bottom px-4 py-4">
          <Image
            src={getAssetPath("/images/avatar/avatar-1.jpg")}
            alt=""
            className="avatar avatar-md rounded-circle"
          />
          <div>
            <h4 className="mb-0 fs-5">{username}</h4>
          </div>
        </div>
        <div className="border-dashed border-top mb-4 pt-4 px-6">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout(); 
            }}
            className="text-secondary d-flex align-items-center gap-2"
          >
            <span>
              <IconLogin2 size={20} strokeWidth={1.5} />
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
