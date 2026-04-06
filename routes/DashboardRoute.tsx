//import node modules libraries
import { v4 as uuid } from "uuid";
import {
  IconFiles,
  IconFile,
  IconLock,
} from "@tabler/icons-react";

//import custom type
import { MenuItemType } from "types/menuTypes";

export const DashboardMenu: MenuItemType[] = [
  {
    id: uuid(),
    title: "Auth",
    link: "/sign-in",
    icon: <IconLock size={20} strokeWidth={1.5} />,
  },
];
