import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Sparkles, Lock, Unlock } from "lucide-react"
import "./animations.css"

// 动态导入组件，禁用SSR
const Base64EncoderDecoderContent = dynamic(
  () => import("./encoder-decoder-content").then(mod => ({ default: mod.Base64EncoderDecoderContent })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }
)

export default function EncoderDecoder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden animate-gradient">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-bounce-gentle delay-100"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse-slow delay-200"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-bounce-gentle delay-300"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse-slow delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Title area */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 animate-slide-in-left delay-100">
            <div className="relative hover-scale">
              <Lock className="w-8 h-8 text-purple-600 transition-all duration-300" />
              <Unlock className="w-6 h-6 text-pink-500 absolute -top-1 -right-1 transition-all duration-300" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
               Emoji Secret
             </h1>
            <Sparkles className="w-8 h-8 text-yellow-500 hover-scale" />
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-slide-in-right delay-200 px-4 sm:px-0">
            Hide your secret messages in emojis, or decode hidden messages from emojis.
            <br />
            <span className="text-purple-600 font-medium">Safe, Fun, Easy to Use</span>
          </p>
        </div>

        {/* Main content card */}
        <div className="max-w-4xl mx-auto animate-fade-in-scale delay-300">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl rounded-3xl overflow-hidden card-hover hover-glow">
            <Base64EncoderDecoderContent />
          </Card>
        </div>

        {/* GitHub link */}
        <div className="text-center mt-8 sm:mt-12 animate-fade-in-up delay-500">
          <a
            href="https://github.com/your-username/emoji-encoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover-lift button-press shadow-lg text-sm sm:text-base"
          >
            <Github className="w-4 h-4" />
            View Source Code
          </a>
        </div>
      </div>
    </div>
  )
}
