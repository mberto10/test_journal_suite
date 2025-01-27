"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { ResultDisplay } from "@/components/result-display"

export default function MustReads() {
  const [links, setLinks] = useState<string[]>([])
  const [currentLink, setCurrentLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)

  const addLink = () => {
    if (currentLink && !links.includes(currentLink)) {
      setLinks([...links, currentLink])
      setCurrentLink("")
    }
  }

  const removeLink = (linkToRemove: string) => {
    setLinks(links.filter((link) => link !== linkToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addLink()
    }
  }

  const generateDrafts = () => {
    setIsLoading(true)
    console.log("Generating drafts for:", links)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setGeneratedResult(
        `Generated drafts for links:\n${links.join("\n")}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      )
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="link">Add Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="link"
                  value={currentLink}
                  onChange={(e) => setCurrentLink(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a link"
                />
                <Button onClick={addLink}>Add</Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Added Links</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {links.map((link, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
                    {link}
                    <button className="ml-2 text-xs" onClick={() => removeLink(link)}>
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={generateDrafts} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" /> Generating...
                </>
              ) : (
                "Generate Drafts"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      {generatedResult && <ResultDisplay result={generatedResult} />}
    </div>
  )
}

