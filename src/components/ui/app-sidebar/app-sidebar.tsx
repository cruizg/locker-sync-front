"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Home,
  Star,
  Users,
} from "lucide-react"

import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// import { IoPeople } from "react-icons/io5"
import Size from "./Size"

// This is sample data.
const data = {
  projects: [
    {
      name: "Inicio",
      url: "/",
      icon: Home,
    },
    {
      name: "Destacados",
      url: "#",
      icon: Star,
    },
    {
      name: "Compartidos",
      url: "#",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: any) {
  // console.log({props:props.cliente})
  const [teams] = React.useState([
    {
      name: props.cliente.name,
      logo: GalleryVerticalEnd,
      plan: props.cliente.subscription.packages.package_name,
    }
  ]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <Size data={props.cliente} />
        {/* <NavUser user={data.user} /> */}
        <NavUser user={props.cliente} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
