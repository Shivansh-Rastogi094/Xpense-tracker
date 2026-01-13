import React, { useEffect, useRef, useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { LuImage, LuX } from "react-icons/lu"

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)

  /* ---------------------------
     Close on outside click
  ---------------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  /* ---------------------------
     Close on ESC key
  ---------------------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="relative w-fit">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 focus:outline-none group"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 border border-gray-300 text-2xl transition group-hover:bg-gray-200">
          {icon ? (
            <span>{icon}</span>         
          ) : (
            <LuImage className="text-gray-500 text-xl" />
          )}
        </div>

        <span className="text-sm text-gray-600">
          {icon ? "Change Icon" : "Pick Icon"}
        </span>
      </button>

      {/* Popup */}
      {isOpen && (
        <div
          ref={pickerRef}
          className="
            absolute z-50 mt-3
            bg-white rounded-xl shadow-xl border
            animate-scale-in
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <p className="text-sm font-medium text-gray-700">
              Select Emoji
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close emoji picker"
            >
              <LuX />
            </button>
          </div>

          {/* Emoji Picker */}
          <EmojiPicker
            height={350}
            width={300}
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji)   // ✅ correct value
              setIsOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup
