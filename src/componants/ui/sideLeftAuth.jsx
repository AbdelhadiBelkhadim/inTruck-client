import React from 'react'

const SideLeftAuth = ({h1 , src}) => {
    return (
        <>
            <div className="relative w-full h-full md:flex justify-center">
                <div className="flex justify-center h-[480px] rounded-b-[200px] md:rounded-none  md:w-full md:h-full bg-none bg-cover bg-center py-10" style={{ backgroundImage: `url(${src})` }}>
                    <h1 className="text-6xl text-white font-newsreader font-medium [text-shadow:_4px_16px_16px_rgb(0_0_0_/_1)]">{h1}</h1>
                </div>
            </div>
            
        </>
    )
}

export default SideLeftAuth;