"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: string) => void
  disabled: boolean
  selectedEmoji: string
  emojiList: string[]
  title?: string
}

export function EmojiSelector({ onEmojiSelect, disabled, selectedEmoji, emojiList, title }: EmojiSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayCount = 12 // Default number of emojis to display
  const shouldShowToggle = emojiList.length > displayCount
  const displayedEmojis = isExpanded ? emojiList : emojiList.slice(0, displayCount)

  return (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 sm:text-base">{title}</h3>
          {shouldShowToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-gray-500 hover:text-gray-700 h-6 px-2 sm:text-sm"
              disabled={disabled}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Show All ({emojiList.length})
                </>
              )}
            </Button>
          )}
        </div>
      )}
      
      <div className={`
          grid gap-1 sm:gap-2 transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded 
            ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 max-h-96' 
            : 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 max-h-16 sm:max-h-20'
          }
        `}>
        {displayedEmojis.map((emoji, index) => (
          <Button
            key={emoji}
            variant="ghost"
            className={`
               relative w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-lg sm:rounded-xl transition-all duration-200 emoji-hover button-press text-sm sm:text-base
               ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-lg hover-lift'}
               ${emoji === selectedEmoji 
                 ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400 shadow-lg scale-105 animate-bounce-gentle' 
                 : 'hover:bg-gray-50 border border-gray-200 hover-glow'
               }
             `}
            onClick={() => !disabled && onEmojiSelect(emoji)}
            disabled={disabled}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <span className="text-lg">{emoji}</span>
            {emoji === selectedEmoji && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></div>
            )}
          </Button>
        ))}
      </div>

      {shouldShowToggle && !title && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-gray-600 hover:text-gray-800 border-gray-200 hover:border-gray-300"
            disabled={disabled}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1" />
                Show More ({emojiList.length - displayCount} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

