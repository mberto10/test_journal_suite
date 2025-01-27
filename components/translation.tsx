"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

export default function Translation() {
  const [sourceLanguage, setSourceLanguage] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("")
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTranslate = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTranslatedText(`Translated text from ${sourceLanguage} to ${targetLanguage}: ${sourceText}`)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sourceLanguage">Source Language</Label>
                <Select onValueChange={setSourceLanguage}>
                  <SelectTrigger id="sourceLanguage">
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetLanguage">Target Language</Label>
                <Select onValueChange={setTargetLanguage}>
                  <SelectTrigger id="targetLanguage">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sourceText">Source Text</Label>
              <Textarea
                id="sourceText"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate"
                rows={5}
              />
            </div>
            <Button onClick={handleTranslate} disabled={isLoading || !sourceLanguage || !targetLanguage || !sourceText}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" /> Translating...
                </>
              ) : (
                "Translate"
              )}
            </Button>
            {translatedText && (
              <div className="space-y-2">
                <Label htmlFor="translatedText">Translated Text</Label>
                <Textarea id="translatedText" value={translatedText} readOnly rows={5} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

