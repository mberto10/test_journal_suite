"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, FileText, BarChart2, BookOpen, Mail, LogOut, Languages, ChevronLeft, ChevronRight } from "lucide-react"

const digitalEconomyItems = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "Reports", href: "/dashboard/reports", icon: FileText },
  { title: "Topic Ticker", href: "/dashboard/topic-ticker", icon: BarChart2 },
  { title: "Must Reads", href: "/dashboard/must-reads", icon: BookOpen },
  { title: "Newsletter Planning", href: "/dashboard/newsletter-planning", icon: Mail },
]

const weltwirtschaftItems = [
  { title: "Home", href: "/dashboard", icon: Home },
  { title: "Translation", href: "/dashboard/translation", icon: Languages },
]

export function Sidebar({ team }: { team: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const sidebarNavItems = team === "digital-economy" ? digitalEconomyItems : weltwirtschaftItems

  const handleLogout = () => {
    localStorage.removeItem("userTeam")
    router.push("/login")
  }

  return (
    <div
      className={cn(
        "relative border-r bg-gray-100/40 transition-all duration-300 ease-in-out dark:bg-gray-800/40",
        isCollapsed ? "w-16" : "w-56",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full bg-gray-200 p-0 dark:bg-gray-800"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4">
          {!isCollapsed && (
            <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
              <span className="text-lg">Agent Suite</span>
            </Link>
          )}
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid items-start px-2 text-sm font-medium">
            {sidebarNavItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent" : "transparent",
                    "cursor-pointer",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {!isCollapsed && <span>{item.title}</span>}
                </span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </div>
  )
}

