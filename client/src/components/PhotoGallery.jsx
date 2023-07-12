import React, {useState} from 'react'

export default function PhotoGallery({place}) {
    const [isOpen, setIsOpen] = useState(false);
    if(isOpen){
        return (

            <div className="absolute bg-black min-w-full m-h-screen inset-0">
                <div className={'flex justify-around'}>
                    <h1 className={'text-white text-2xl px-8 py-4'}>{place.title}</h1>
                    <button onClick={() => setIsOpen(false)} className={'fixed bg-white shadow px-3 py-2 right-4 top-8 rounded-2xl flex gap-2'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        Close
                    </button>
                </div>

                <div className={'p-8 w-full bg-black'}>
                    <div className={'gap-4 grid max-w-7xl mx-auto'}>
                        {place && place.photos && place.photos.map((photo) => (
                            <img className={'w-full'} key={photo} src={'http://localhost:4000/uploads/'+ photo} />
                        ))}
                    </div>
                </div>

            </div>

        )
    }
    return (
        <div>
            <div className={'relative my-4 rounded-2xl overflow-hidden '}>
                <div className={'grid gap-2 grid-cols-[2fr_1fr] rounded-2xl'}>
                    <div>
                        {place.photos && (<img className={'cursor-pointer'} onClick={() => {setIsOpen(true)}} src={'http://localhost:4000/uploads/'+place.photos[0]}/>)}
                    </div>
                    <div className={'grid gap-2 relative overflow-hidden'}>
                        <div>
                            {place.photos && (<img className={'cursor-pointer'} onClick={() => {setIsOpen(true)}} src={'http://localhost:4000/uploads/'+place.photos[1]}/>)}
                        </div>

                        {place?.photos?.[2] && (
                            <div className={'absolute -bottom-2'}>
                                {place.photos && (<img className={'cursor-pointer'} onClick={() => {setIsOpen(true)}} src={'http://localhost:4000/uploads/'+place.photos[2]}/>)}
                            </div>
                        )}


                    </div>
                </div>
                <button onClick={() => {setIsOpen(true)}} className={'absolute bottom-2 right-2 px-3 py-2 rounded-2xl flex gap-1'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show photos
                </button>
            </div>
        </div>
    )
}
