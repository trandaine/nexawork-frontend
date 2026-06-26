import { AppSidebar } from "@/src/widgets/layout/app-sidebar"
import { SiteHeader } from "@/src/widgets/layout/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { auth } from "@/auth"

export default async function NavLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" session={session} />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
