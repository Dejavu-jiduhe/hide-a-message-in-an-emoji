"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { decode, encode } from "./encoding"
import { EmojiSelector } from "@/components/emoji-selector"
import { ALPHABET_LIST, EMOJI_LIST } from "./emoji"
import { Copy, Check, AlertCircle, ArrowRight, Type, Smile } from "lucide-react"

export function Base64EncoderDecoderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read mode from URL parameters, other state stored locally
  const mode = searchParams.get("mode") || "encode"
  const [inputText, setInputText] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("😀")
  const [outputText, setOutputText] = useState("")
  const [errorText, setErrorText] = useState("")
  const [copied, setCopied] = useState(false)

  // Update URL when mode changes
  const updateMode = (newMode: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("mode", newMode)
    router.replace(`?${params.toString()}`)
  }

  // Convert input whenever it changes
  useEffect(() => {
    try {
      const isEncoding = mode === "encode"
      const output = isEncoding ? encode(selectedEmoji, inputText) : decode(inputText)
      setOutputText(output)
      setErrorText("")
    } catch (e) {
      setOutputText("")
      setErrorText(`${mode === "encode" ? "Encoding" : "Decoding"} error: Invalid input format`)
    }
  }, [mode, selectedEmoji, inputText])

  const handleModeToggle = (checked: boolean) => {
    updateMode(checked ? "encode" : "decode")
    setInputText("") // Clear input text when mode changes
  }

  // Handle initial URL state
  useEffect(() => {
    if (!searchParams.has("mode")) {
      updateMode("encode")
    }
  }, [searchParams, updateMode])

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isEncoding = mode === "encode"

  return (
    <CardContent className="space-y-6 p-4 sm:p-6">
      {/* Introduction text */}
      <div className="text-center">
        <p className="text-gray-600 leading-relaxed">
          This tool can encode hidden messages into emojis or letters. You can also paste text containing hidden messages to decode them.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 sm:space-x-4 bg-gray-50 rounded-full p-1">
          <Label 
             htmlFor="mode-toggle" 
             className={`px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
               !isEncoding ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'
             }`}
           >
             Decode Message
           </Label>
          <Switch 
            id="mode-toggle" 
            checked={isEncoding} 
            onCheckedChange={handleModeToggle}
            className="data-[state=checked]:bg-purple-500"
          />
          <Label 
             htmlFor="mode-toggle" 
             className={`px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
               isEncoding ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'
             }`}
           >
             Encode Message
           </Label>
        </div>
      </div>

      {/* Input area */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Type className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
             {isEncoding ? "Input Message" : "Input Emojis"}
           </h3>
        </div>
        <Textarea
           placeholder={isEncoding ? "Enter your secret message here..." : "Paste emojis here..."}
           value={inputText}
           onChange={(e) => setInputText(e.target.value)}
           className="min-h-[120px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl input-focus transition-all duration-300"
         />
      </div>

      {/* Emoji selector */}
      {isEncoding && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Smile className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">Select Carrier Symbol</h3>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
            <EmojiSelector
              title="Emojis"
              onEmojiSelect={setSelectedEmoji}
              selectedEmoji={selectedEmoji}
              emojiList={EMOJI_LIST}
              disabled={!isEncoding}
            />
            
            <EmojiSelector
              title="Letters"
              onEmojiSelect={setSelectedEmoji}
              selectedEmoji={selectedEmoji}
              emojiList={ALPHABET_LIST}
              disabled={!isEncoding}
            />
          </div>
        </div>
      )}

      {/* Conversion indicator */}
      {inputText && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <ArrowDown className="w-4 h-4 text-purple-600 animate-bounce" />
            <span className="text-purple-700 text-sm font-medium">
              {mode === 'encode' ? 'Encoding...' : 'Decoding...'}
            </span>
          </div>
        </div>
      )}

      {/* Output area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800">
              {isEncoding ? "Encoded Result" : "Decoded Result"}
            </h3>
          </div>
          {outputText && (
            <Button
               variant="outline"
               size="sm"
               onClick={handleCopy}
               className="flex items-center gap-2 text-xs button-press hover-lift transition-all duration-200"
             >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>
        <Textarea
           placeholder={`${isEncoding ? "Encoded" : "Decoded"} result will appear here...`}
           value={outputText}
           readOnly
           className="min-h-[120px] resize-none border-gray-200 bg-gray-50 rounded-xl transition-all duration-300"
         />
      </div>

      {/* Error message */}
      {errorText && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{errorText}</span>
        </div>
      )}

      {/* Usage hint */}
      {!inputText && (
        <div className="text-center text-gray-500 text-sm bg-blue-50 rounded-xl p-4">
          💡 Tip: {isEncoding ? "Enter any text, select an emoji, and generate symbols containing hidden messages" : "Paste emojis or letters containing hidden messages to decode the original message"}
        </div>
      )}
    </CardContent>
  )
}
