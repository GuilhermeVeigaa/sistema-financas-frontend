import React, { useState } from 'react'

export default function UserImage() {

    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    const [imageUploaded, setImagUploaded] = useState<boolean>(false)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImagUploaded(true)
            };
            reader.readAsDataURL(file);
        }
    };
 
  return (
    <div>
        
        {!imageUploaded ? (
            <div className='flex items-center w-[9rem] h-[1rem] py-8'>
                <input className='w-36 h-10 rounded-md'type="file" accept='image/*' onChange={handleImageUpload} />
            </div>
        ) : null}

            {image ? (
                <picture className='w-[80px]'>
                    <img className='w-[80px] h-[80px] rounded-full' src={image as string} alt="Imagem do usuário" />
                </picture>
            ) : (
                <></>
            )}
    </div>
  )
}
