"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { ResultDisplay } from "@/components/result-display"

export default function TopicTicker() {
  const [currentTopic, setCurrentTopic] = useState("")
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })
  const [format, setFormat] = useState("ticker")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)

  const addTopic = () => {
    if (currentTopic) {
      // Here you would typically add the topic to a list or send it to an API
      console.log("Added topic:", currentTopic)
      setCurrentTopic("")
    }
  }

  const generateTopicTicker = () => {
    setIsLoading(true)
    console.log("Generating topic ticker with:", { currentTopic, dateRange, format })
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setGeneratedResult(
        `Generated ${format} for topic: ${currentTopic}\n\nDate range: ${dateRange.from.toDateString()} to ${dateRange.to.toDateString()}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      )
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="topic">Add Topic</Label>
              <div className="flex space-x-2">
                <Input
                  id="topic"
                  value={currentTopic}
                  onChange={(e) => setCurrentTopic(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTopic()}
                  placeholder="Enter a topic"
                />
                <Button onClick={addTopic}>Add</Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Timeline</Label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <div className="grid gap-2">
              <Label>Format</Label>
              <RadioGroup defaultValue="ticker" onValueChange={(value) => setFormat(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ticker" id="ticker" />
                  <Label htmlFor="ticker">Ticker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="report" id="report" />
                  <Label htmlFor="report">Report</Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="w-full" onClick={generateTopicTicker} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" /> Generating...
                </>
              ) : (
                "Generate Topic Ticker"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      {generatedResult && <ResultDisplay result={generatedResult} />}
    </div>
  )
}

