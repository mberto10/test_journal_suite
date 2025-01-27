"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Pencil, Trash, Plus, Check, ChevronsUpDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { ResultDisplay } from "@/components/result-display"

type ContextItem = {
  id: string
  title: string
  content: string
  included: boolean
}

type KeywordSet = {
  name: string
  keywords: string[]
}

export default function NewsletterPlanning() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const [contextItems, setContextItems] = useState<ContextItem[]>([
    { id: "1", title: "Technology", content: "Latest tech news and trends", included: true },
    { id: "2", title: "Politics", content: "Current political events and analysis", included: false },
    { id: "3", title: "Environment", content: "Environmental issues and sustainability", included: true },
  ])
  const [newItemTitle, setNewItemTitle] = useState("")
  const [newItemContent, setNewItemContent] = useState("")
  const [editingItem, setEditingItem] = useState<ContextItem | null>(null)
  const [keywordSets] = useState<KeywordSet[]>([
    { name: "Technology", keywords: ["AI", "Blockchain", "5G"] },
    { name: "Environment", keywords: ["Climate Change", "Renewable Energy", "Sustainability"] },
  ])
  const [selectedKeywordSet, setSelectedKeywordSet] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)

  const addItem = () => {
    if (newItemTitle && newItemContent) {
      setContextItems([
        ...contextItems,
        {
          id: Date.now().toString(),
          title: newItemTitle,
          content: newItemContent,
          included: true,
        },
      ])
      setNewItemTitle("")
      setNewItemContent("")
    }
  }

  const updateItem = () => {
    if (editingItem) {
      setContextItems(contextItems.map((item) => (item.id === editingItem.id ? { ...editingItem } : item)))
      setEditingItem(null)
    }
  }

  const deleteItem = (id: string) => {
    setContextItems(contextItems.filter((item) => item.id !== id))
  }

  const toggleIncludeContext = (id: string) => {
    setContextItems(contextItems.map((item) => (item.id === id ? { ...item, included: !item.included } : item)))
  }

  const generateSuggestion = () => {
    setIsLoading(true)
    const includedContexts = contextItems.filter((item) => item.included)
    console.log("Generating suggestion with:", { dateRange, includedContexts, selectedKeywordSet })
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setGeneratedResult(
        `Generated newsletter suggestion:\n\nDate range: ${dateRange?.from?.toDateString()} to ${dateRange?.to?.toDateString()}\n\nIncluded contexts: ${includedContexts.map((item) => item.title).join(", ")}\n\nSelected keyword set: ${selectedKeywordSet}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      )
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Timeline</Label>
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
              </div>
              <div className="grid gap-2">
                <Label>Choose Keyword Set</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                      {selectedKeywordSet
                        ? keywordSets.find((set) => set.name === selectedKeywordSet)?.name
                        : "Select keyword set..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search keyword sets..." />
                      <CommandList>
                        <CommandEmpty>No keyword set found.</CommandEmpty>
                        <CommandGroup>
                          {keywordSets.map((set) => (
                            <CommandItem
                              key={set.name}
                              onSelect={() => {
                                setSelectedKeywordSet(set.name === selectedKeywordSet ? "" : set.name)
                                setOpen(false)
                              }}
                            >
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
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Context Items</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" /> Add Context
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle>Add New Context Item</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-title">Title</Label>
                        <Input
                          id="new-title"
                          value={newItemTitle}
                          onChange={(e) => setNewItemTitle(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-content">Content</Label>
                        <Textarea
                          id="new-content"
                          value={newItemContent}
                          onChange={(e) => setNewItemContent(e.target.value)}
                          className="w-full min-h-[150px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addItem}>Add Context</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="border rounded-md p-4 space-y-4">
                {contextItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between space-x-2 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start space-x-2">
                      <Checkbox checked={item.included} onCheckedChange={() => toggleIncludeContext(item.id)} />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.content}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <DialogTitle>Edit Context Item</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-title">Title</Label>
                              <Input
                                id="edit-title"
                                value={editingItem?.title}
                                onChange={(e) =>
                                  setEditingItem((prev) => (prev ? { ...prev, title: e.target.value } : null))
                                }
                                className="w-full"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-content">Content</Label>
                              <Textarea
                                id="edit-content"
                                value={editingItem?.content}
                                onChange={(e) =>
                                  setEditingItem((prev) => (prev ? { ...prev, content: e.target.value } : null))
                                }
                                className="w-full min-h-[150px]"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={updateItem}>Update Context</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={generateSuggestion} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" /> Generating...
                </>
              ) : (
                "Generate Suggestion"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      {generatedResult && <ResultDisplay result={generatedResult} />}
    </div>
  )
}

