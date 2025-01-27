"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [team, setTeam] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userTeam = localStorage.getItem("userTeam")
    if (!userTeam) {
      router.push("/login")
    } else {
      setTeam(userTeam)
    }
  }, [router])

  if (!team) {
    return null // or a loading spinner
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Sidebar team={team} />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}

