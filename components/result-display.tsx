"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Copy } from "lucide-react"
import { useClipboard } from "use-clipboard-copy"

interface ResultDisplayProps {
  result: string
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const [isCopied, setIsCopied] = useState(false)
  const clipboard = useClipboard()

  const handleCopy = () => {
    clipboard.copy(result)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">Generated Result</h3>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
        <div className="whitespace-pre-wrap">{result}</div>
      </CardContent>
    </Card>
  )
}

