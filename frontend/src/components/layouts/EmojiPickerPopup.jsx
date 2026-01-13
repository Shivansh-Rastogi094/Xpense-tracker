import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          {icon ? (
            <img src={icon} alt="Icon" />
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {isOpen && (
        <div>
          <button onClick={() => setIsOpen(false)}>
            <LuX />
          </button>

          <EmojiPicker
            onEmojiClick={(emojiData) =>
              onSelect(emojiData?.emoji || '')
            }
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup
