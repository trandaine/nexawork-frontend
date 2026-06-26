"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/shared/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/shared/ui/sidebar"
import { UserCircleIcon, CreditCardIcon, BellIcon, SignOutIcon } from "@phosphor-icons/react"
import { signOut } from "next-auth/react"

export function NavUser({
  user,
  session
}: {
  user: {
    name: string
    email: string
    avatar: string
  },
  session?: any
}) {
  const { isMobile } = useSidebar()

  const bannerImage = "https://plus.unsplash.com/premium_photo-1733864827286-d43afe9a1ae7?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const avatarImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full relative max-w-85 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-25 w-full bg-gray-200 relative">
                {/* Background Image */}
                <img
                  src={bannerImage}
                  alt="Profile Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-13 left-4  z-10 h-26 w-26">
                <Avatar className="inset-0.75 w-24.5 h-24.5 rounded-full object-cover z-10">
                  <AvatarImage src={avatarImage} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <div className="px-5 pb-5 relative bg-[#faf9f6]">
                <div className="mt-16"></div>
                {/* Name */}
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  {user.name}
                </h1>
                {/* Bio */}
                <p className="text-[15px] text-gray-800 mt-1 leading-snug">
                  Full-Stack Developer (.NET Core / React) | @Greenwich Vietnam
                </p>
                {/* Location */}
                <p className="text-[13px] text-gray-500 mt-1.5">
                  Ho Chi Minh City
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircleIcon
                />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon
                />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon
                />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => {
              // 1. Redirect to OpenIddict to clear IDP session first
              // 2. OpenIddict will redirect back to our app where we can clear NextAuth session
              // Or we can clear NextAuth session locally first, then bounce to OpenIddict
              await signOut({ redirect: false });
              const idToken = session?.idToken;
              const openiddictLogoutUrl = `https://localhost:7036/connect/logout?post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/callback/logout')}${idToken ? `&id_token_hint=${idToken}` : ''}`;
              window.location.href = openiddictLogoutUrl;
            }}>
              <SignOutIcon
              />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
