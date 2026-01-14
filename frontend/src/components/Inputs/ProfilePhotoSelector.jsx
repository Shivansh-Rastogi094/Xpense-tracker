import React, { useRef, useState } from 'react'
import { LuUser, LuTrash, LuUpload } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }

    }
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }
    const onChooseFile = () => {
        inputRef.current.click();
    }
    
    return (
        <div className='flex justify-center mb-6'>
            <input type="file"
                accept='image/*'
                className='hidden'
                ref={inputRef}
                onChange={handleImageChange}
            />

            {!image ? (
                // Empty State
                <div className='w-20 h-20 flex items-center justify-center rounded-2xl relative bg-alice-600 dark:bg-stormy-300'>
                    <LuUser className='text-4xl text-stormy-400 dark:text-pearl-600' />
                    <button
                        type='button'
                        onClick={onChooseFile}
                        className='
                            w-8 h-8 flex items-center justify-center rounded-full absolute -bottom-2 -right-2 transition-transform hover:scale-110
                            bg-stormy-500 text-white border-2 border-white
                            dark:bg-pearl-500 dark:text-stormy-200 dark:border-stormy-200
                        '>
                        <LuUpload />
                    </button>
                </div>
            ) : (
                // Image Selected State
                <div className='relative'>
                    <img
                        src={previewUrl}
                        alt='ProfilePreview'
                        className='w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-alice-200 dark:border-stormy-400'
                    />
                    <button
                        onClick={handleRemoveImage}
                        className='
                            w-8 h-8 flex items-center justify-center rounded-full absolute -bottom-2 -right-2 transition-transform hover:scale-110
                            bg-tangerine-500 text-white border-2 border-white
                            dark:border-stormy-200
                        '
                        type='button'
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector