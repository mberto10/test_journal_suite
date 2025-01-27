"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BarChart2, BookOpen, Mail, Languages } from "lucide-react"

export default function Home() {
  const [team, setTeam] = useState<string | null>(null)

  useEffect(() => {
    setTeam(localStorage.getItem("userTeam"))
  }, [])

  const digitalEconomyModules = [
    {
      title: "Reports",
      description: "Generate and manage AI-powered reports",
      icon: FileText,
      href: "/dashboard/reports",
    },
    {
      title: "Topic Ticker",
      description: "Track trending topics in real-time",
      icon: BarChart2,
      href: "/dashboard/topic-ticker",
    },
    {
      title: "Must Reads",
      description: "Curated list of essential articles",
      icon: BookOpen,
      href: "/dashboard/must-reads",
    },
    {
      title: "Newsletter Planning",
      description: "Plan and create engaging newsletters",
      icon: Mail,
      href: "/dashboard/newsletter-planning",
    },
  ]

  const weltwirtschaftModules = [
    {
      title: "Translation",
      description: "Translate content between languages",
      icon: Languages,
      href: "/dashboard/translation",
    },
    { title: "Placeholder 1", description: "Description for Placeholder 1", icon: FileText, href: "#" },
    { title: "Placeholder 2", description: "Description for Placeholder 2", icon: BarChart2, href: "#" },
    { title: "Placeholder 3", description: "Description for Placeholder 3", icon: BookOpen, href: "#" },
  ]

  const modules = team === "digital-economy" ? digitalEconomyModules : weltwirtschaftModules

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Welcome to Agent Suite</h1>
        <h2 className="text-2xl font-semibold mt-2">
          Team: {team === "digital-economy" ? "Digital Economy" : "Weltwirtschaft"}
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {modules.map((module, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{module.title}</CardTitle>
              <module.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{module.description}</CardDescription>
              <Link
                href={module.href}
                className={`text-sm font-medium ${module.href === "#" ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"}`}
              >
                {module.href === "#" ? "Coming Soon" : `Go to ${module.title}`}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

