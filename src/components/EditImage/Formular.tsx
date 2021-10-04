import { formularType, photoType } from './../../TypeDefinition'
import { useRef, useState } from 'react'

export const Formular = ({editPhoto, change, editLogic, setEditPhoto} : formularType) => {

    const [ imgParams, setImgParams ] = useState( { size: 0, lastModified: '' } )
    const [ isLoading, setIsLoading ] = useState( false )

    const form = useRef<HTMLFormElement>(null)

    const onImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {

        if( !event.target.files ) return 

        const file = event.target.files[0]
        const { size, lastModified } = file
        const sizeMB = +(size / (1024 * 1024)).toFixed(1)
        const last = new Date(lastModified)
        const lastModifiedText = `${last.getDay()}.${last.getMonth() + 1}.${last.getFullYear()}`

        setImgParams({ size: sizeMB, lastModified: lastModifiedText })

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadstart = () => setIsLoading(true)
        reader.onloadend   = () => setIsLoading(false)
        reader.onload      = () => setEditPhoto( (old:photoType) => ( { ...old, url: reader.result } ) )
    }

    const imgStatus = () => {
        if (isLoading) return <span> ...nahrávám...</span>
        if (imgParams.size) return <span> | {imgParams.size}MB | {imgParams.lastModified}</span>
    }

    return (

        <form ref={form} name="formular" >
            <div className="form_booking">
                <input name="id" value={ editPhoto?.id } onChange={ change } hidden /> 
                <div className="input_booking">
                    <label>Název</label>
                    <input value={ editPhoto?.header } onChange={ change } placeholder="zadej název" name="header" size={34} />
                </div>
                <div className="input_booking" style={{ width: '40%' }}>
                    <label>Kategorie</label>
                    <select value={ editPhoto?.typ } onChange={ change } name="typ">
                        <option value="" >--- vyber kategorii</option>
                        <option value="0">Ubytování</option>
                        <option value="1">Lipenská přehrada</option>
                        <option value="2">Příroda</option>
                        <option value="3">Obce</option>
                        <option value="4">Historie</option>
                        <option value="5">Sport</option>
                        <option value="6">Ostatní</option>
                        <option value="7">Všechny</option>
                        <option value="10">Kaliště - kniha</option>
                        <option value="11">Kaliště</option>
                    </select>
                </div>
                <div className="input_booking" style={{ width: '40%' }}>
                    <label>Datum focení</label>
                    <input name="date" value={ editPhoto?.date } onChange={ change } size={10} type="date" />
                </div>
                <div className="input_booking">
                    <label>Popis</label>
                    <textarea value={ editPhoto?.text } onChange={ change } name="text" rows={2} cols={60} placeholder="popis fotky"  wrap="Yes"></textarea>
                </div>
                <div className="input_booking" style={{ width: '40%' }}>
                    <label>Autor</label>
                    <input value={ editPhoto?.autor } onChange={ change } name="autor" placeholder="autor" size={10} />
                </div>
                <div className="input_booking" style={{ width: '40%' }}>
                    <label>Email</label>
                    <input placeholder="email" name="email" value={ editPhoto?.email } onChange={ change } size={20} />
                </div>
                <div className="input_booking">
                    <label>otoceni vlevo o kolik stupňů</label>
                    <input value={ editPhoto?.rotate || 0} onChange={ change } type="number" name="rotate" min="0" max="270" step="90"  />
                </div>
                <div className="input_booking">
                    <label>Vyberte foto { imgStatus() } </label>
                    <input type="file" name="upfile" accept="image/*" onChange={ onImageChange } />
                    
                </div>
                <div className="submit_booking">
                    <input type="Submit" onClick={event => editLogic(event, form.current)} name="create" defaultValue="Přidej" />
                </div>
                <div className="submit_booking" style={{ backgroundColor: 'rgba(0, 0, 256, 0.4)' }}>
                    <input type="Submit" onClick={event => editLogic(event, form.current)} name="update" defaultValue="Uprav" />
                </div>
                <div className="submit_booking" style={{ backgroundColor: 'rgba(256, 0, 0, 0.4)' }}>
                    <input type="Submit" onClick={event => editLogic(event, form.current)} name="delete" defaultValue="Smaž" />
                </div>
            </div>
        </form>
    )
}