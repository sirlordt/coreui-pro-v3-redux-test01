import {
  //CSidebarNavDivider,
  //CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle
} from "@coreui/react";

export default [
  {
    _tag: CSidebarNavTitle,
    _children: [ "Business" ]
  },
  {
    _tag: CSidebarNavItem,
    name: "Test01",
    to: "/home/test01",
    icon: "cil-drop"
  },
  {
    _tag: CSidebarNavItem,
    name: "Test02",
    to: "/home/test02",
    icon: "cil-pencil"
  },
  {
    _tag: CSidebarNavTitle,
    _children: [ "System" ]
  },
  {
    _tag: CSidebarNavItem,
    name: "Test01",
    to: "/home/test01",
    icon: "cil-drop"
  },
  {
    _tag: CSidebarNavItem,
    name: "Test02",
    to: "/home/test02",
    icon: "cil-pencil"
  }
];
