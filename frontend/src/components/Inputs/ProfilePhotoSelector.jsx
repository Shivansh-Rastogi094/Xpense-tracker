import React, { useRef, useState } from 'react'
import { LuUser, LuTrash,LuUpload  } from 'react-icons/lu';

const ProfilePhotoSelector = ({image,setImage}) => {
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
            <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                <LuUser className='text-4xl text-primary'/>
            <button 
                type='button'
                onClick={onChooseFile}
                className='w-8 h-8 items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 flex'>
                <LuUpload className=''/>
            </button>
    </div>
        ) : (
            <div className='relative'>
                <img 
                src={previewUrl}
                alt='ProfilePreview'
                className='w-20 h-20 rounded-full object-cover'
                />
                <button
                onClick={handleRemoveImage}
                className='w-8 h-8 items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 flex'
                type='button'
                >
                    <LuTrash/>
                </button>
            </div>
        )}


        
    </div>
  )
}

export default ProfilePhotoSelector