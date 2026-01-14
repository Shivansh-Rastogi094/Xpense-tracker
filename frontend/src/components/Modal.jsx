import React from 'react'
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title }) => {

    if (!isOpen) return null;

    return (
        // 1. Overlay: Glass effect with slight Stormy tint
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-stormy-100/60 dark:bg-stormy-100/80 backdrop-blur-sm p-4 overflow-y-auto'>
            
            {/* 2. Modal Container */}
            <div className='relative w-full max-w-2xl max-h-full'>
                <div className='relative rounded-2xl shadow-2xl transition-all
                    bg-white border border-alice-200
                    dark:bg-stormy-200 dark:border-stormy-300'
                >
                    
                    {/* Header */}
                    <div className='flex items-center justify-between p-4 md:p-5 border-b border-alice-200 dark:border-stormy-300'>
                        <h3 className='text-lg font-bold text-stormy-500 dark:text-alice-500'>
                            {title}
                        </h3>
                        
                        <button
                            type='button'
                            onClick={onClose}
                            className='
                                p-2 rounded-lg transition-colors
                                text-stormy-300 hover:bg-alice-600 hover:text-tangerine-500
                                dark:text-pearl-600 dark:hover:bg-stormy-300 dark:hover:text-tangerine-500
                            '
                        >
                            <LuX className="text-xl" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className='p-4 md:p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal