# Emoji Encoder - Hide Messages in Emojis

A fun and interactive web application that allows you to encode text messages into emoji sequences and decode them back to readable text.

## Features

- **Text to Emoji Encoding**: Convert any text message into a sequence of emojis
- **Emoji to Text Decoding**: Decode emoji sequences back to original text
- **Interactive Emoji Selector**: Choose from over 100 popular emojis
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real-time Processing**: Instant encoding and decoding as you type

## How It Works

The application uses a Base64 encoding algorithm to convert text into emoji representations:
1. Text is first encoded to Base64
2. Base64 characters are mapped to specific emojis
3. The result is a sequence of emojis that represents your original message

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Encoding**: Enter your text message and click "Encode to Emojis"
2. **Decoding**: Paste emoji sequences and click "Decode from Emojis"
3. **Copy Results**: Click the copy button to copy encoded/decoded results

## Example

- Input: `Hello World!`
- Output: `😀🎉🌟💫🎨🎭🎪🎯🎲🎸🎺🎻`

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).