import { useState } from 'react'
import { photoType } from "../../TypeDefinition"
import { imageChangeType } from "../../TypeDefinition"

export const ImageChange = ( {setEditPhoto} : imageChangeType) => {

    const [ isLoading, setIsLoading ] = useState( false ) 
    const [ imgParams, setImgParams ] = useState( { size: 0, lastModified: '', type: '' } )
    
    const justLogic = (event: React.ChangeEvent<HTMLInputElement>) => {

        if( !event.target.files ) return 

        const imgExtensionFromType = ( imgType: string ): string => ({
            'image/jpeg'   : 'jpg',
            'image/png'    : 'png',
            'image/gif'    : 'gif',
            'image/svg+xml': 'svg',
            'image/webp'   : 'webp'
        })[imgType] ?? 'jpg' 

        const file = event.target.files[0]
        const { size, lastModified, type: imgType  } = file
        const sizeMB = +(size / (1024 * 1024)).toFixed(1)
        const last = new Date(lastModified)
        const lastModifiedText = `${last.getDay()}.${last.getMonth() + 1}.${last.getFullYear()}`

        setImgParams({ size: sizeMB, lastModified: lastModifiedText, type: imgType })

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadstart = () => setIsLoading(true)
        reader.onloadend   = () => setIsLoading(false)
        reader.onload      = () => setEditPhoto( (old:photoType) => ( { ...old, url: reader.result, imgType: imgExtensionFromType(imgType) } ) )

    }

    const imgStatus = () => {
        if (isLoading) return <span className="isLoading"> . . . n a h r á v á m . . .</span>
        if (imgParams.type) return <span> | {imgParams.type} | {imgParams.size}MB | {imgParams.lastModified}</span>
    }

    return (
        <div className="input_booking">
            <label>Vyberte foto { imgStatus() } </label>
            <input type="file" name="upfile" accept="image/*" onChange={ (event) => justLogic(event) } />
        </div>
    )
}