"use client"

import { useState, type KeyboardEvent, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { DateRange } from "react-day-picker"
import { Spinner } from "@/components/ui/spinner"
import { ResultDisplay } from "@/components/result-display"

export default function Reports() {
  const [keywords, setKeywords] = useState<string[]>([])
  const [currentKeyword, setCurrentKeyword] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const [savedKeywordSets, setSavedKeywordSets] = useState<{ name: string; keywords: string[] }[]>([
    { name: "Technology", keywords: ["AI", "Blockchain", "5G"] },
    {
      name: "Environment",
      keywords: ["Climate Change", "Renewable Energy", "Sustainability"],
    },
  ])
  const [open, setOpen] = useState(false)
  const [selectedKeywordSet, setSelectedKeywordSet] = useState("")
  const [newSetName, setNewSetName] = useState("")
  const [isKeywordSetModified, setIsKeywordSetModified] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)

  useEffect(() => {
    if (selectedKeywordSet) {
      const currentSet = savedKeywordSets.find((set) => set.name === selectedKeywordSet)
      if (currentSet) {
        setIsKeywordSetModified(!areArraysEqual(currentSet.keywords, keywords))
      }
    }
  }, [keywords, selectedKeywordSet, savedKeywordSets])

  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
  }

  const addKeyword = () => {
    if (currentKeyword && !keywords.includes(currentKeyword)) {
      setKeywords([...keywords, currentKeyword])
      setCurrentKeyword("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addKeyword()
    }
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const saveKeywordSet = () => {
    if (keywords.length > 0) {
      if (selectedKeywordSet && isKeywordSetModified) {
        setSavedKeywordSets(
          savedKeywordSets.map((set) => (set.name === selectedKeywordSet ? { ...set, keywords } : set)),
        )
      } else {
        const newSet = {
          name: newSetName || `Set ${savedKeywordSets.length + 1}`,
          keywords: [...keywords],
        }
        setSavedKeywordSets([...savedKeywordSets, newSet])
        setSelectedKeywordSet(newSet.name)
      }
      setNewSetName("")
      setIsKeywordSetModified(false)
      setDialogOpen(false)
    }
  }

  const selectKeywordSet = (setName: string) => {
    const selected = savedKeywordSets.find((set) => set.name === setName)
    if (selected) {
      setKeywords(selected.keywords)
      setSelectedKeywordSet(setName)
      setIsKeywordSetModified(false)
    }
    setOpen(false)
  }

  const unselectKeywordSet = () => {
    setSelectedKeywordSet("")
    setKeywords([])
    setIsKeywordSetModified(false)
  }

  const generateReport = () => {
    setIsLoading(true)
    console.log("Generating report with:", {
      keywords,
      dateRange: {
        from: dateRange?.from?.toISOString(),
        to: dateRange?.to?.toISOString(),
      },
    })
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setGeneratedResult(
        `Generated report for keywords: ${keywords.join(", ")}\n\nDate range: ${dateRange?.from?.toDateString()} to ${dateRange?.to?.toDateString()}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      )
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="keywords">Keywords</Label>
              <div className="flex space-x-2">
                <Input
                  id="keywords"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a keyword"
                />
                <Button onClick={addKeyword}>Add</Button>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>{selectedKeywordSet && isKeywordSetModified ? "Update Set" : "Save Set"}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {selectedKeywordSet && isKeywordSetModified ? "Update Keyword Set" : "Save New Keyword Set"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="setName" className="text-right">
                          Set Name
                        </Label>
                        <Input
                          id="setName"
                          value={selectedKeywordSet && isKeywordSetModified ? selectedKeywordSet : newSetName}
                          onChange={(e) =>
                            selectedKeywordSet && isKeywordSetModified
                              ? setSelectedKeywordSet(e.target.value)
                              : setNewSetName(e.target.value)
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={saveKeywordSet}>
                      {selectedKeywordSet && isKeywordSetModified ? "Update" : "Save"}
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
                    {keyword}
                    <button className="ml-2 text-xs" onClick={() => removeKeyword(keyword)}>
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Saved Keyword Sets</Label>
              <div className="flex items-center space-x-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between w-[200px]"
                    >
                      {selectedKeywordSet || "Select keyword set..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search keyword sets..." />
                      <CommandList>
                        <CommandEmpty>No keyword set found.</CommandEmpty>
                        <CommandGroup>
                          {savedKeywordSets.map((set) => (
                            <CommandItem key={set.name} onSelect={() => selectKeywordSet(set.name)}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedKeywordSet === set.name ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {set.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {selectedKeywordSet && (
                  <Button variant="ghost" size="icon" onClick={unselectKeywordSet} className="h-9 w-9">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Timeline</Label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <Button className="w-full" onClick={generateReport} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" /> Generating...
                </>
              ) : (
                "Generate Report"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      {generatedResult && <ResultDisplay result={generatedResult} />}
    </div>
  )
}

