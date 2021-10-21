import { formularType, photoType, categoryNameType, categoryChangeType } from './../../TypeDefinition'
import { useRef, useState, useEffect } from 'react'
import { AlertBox } from './AlertBox'
import { readCategoryName } from '../../api/read'
import './../BigImage/CategoryListEdit.css' 

export const Formular = ({editPhoto, change, editLogic, editCategoryLogic, setEditPhoto, alert, setImgPosition, categoryObj} : formularType) => {

    const [ isCategory, setIsCategory] = useState( false )
    const [ categoryName, setCategoryName ] = useState<categoryNameType | null>( null )


    const [ imgParams, setImgParams ] = useState( { size: 0, lastModified: '', type: '' } )
    const [ isLoading, setIsLoading ] = useState( false ) 

    const form = useRef<HTMLFormElement>(null)
    const formCategory = useRef<HTMLFormElement>(null)

    const onImageChange = (event:React.ChangeEvent<HTMLInputElement>) => {

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
        console.log(file)
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

    const editCategory = (event:React.MouseEvent<HTMLInputElement>) => {
        if ( !event ) return
        event.preventDefault()
        setIsCategory( old => !old )
    }


    const categoryChange = (e:categoryChangeType) => {
        const { name, value } = e.target

        if ( name.startsWith('name-') ) {
            const key = name.replace('name-', '') 
            setCategoryName( orig => ( { ...orig, [key]: value } ) )
        }
    } 

    const category = []

    for (const [key, value] of Object.entries( categoryObj ) ) {
        const changeCategory = () => setImgPosition( prev => ({ ...prev, category: +key, smallImgStart:0, current: 0 }) )
        category.push(
            <div key={key} onClick={ changeCategory } className="oneLine">
                <article>index-{ key }</article>
                <div className="input_booking" style={{ width: '50%' }}>
                    <input value={ categoryName?.[+key] } onChange={ categoryChange }  name={`name-${key}`} placeholder="text" size={10} />
                </div>
                <article>{value}x</article>
            </div>
        )
    }

    useEffect( () => {
        ( async() => {
            const resp = await readCategoryName()
            console.log( resp )
            setCategoryName( resp )
            
        })()
        
    }, [] )

    return (

isCategory ? <form ref={formCategory} name="formularCategory" >
                <div className="form_booking" >
                    <div className="input_booking">
                        <section className="categoryListEdit">    
                            {category}
                        </section>
                    </div>
  
                    <div className="submit_booking red" style={{ backgroundColor: 'rgba(256, 0, 256, 0.4)' }}>
                        <input type="Submit" onClick={event => editCategory(event)} name="delete" defaultValue="Zpět Foto" />
                    </div>
                    <div className="submit_booking red" style={{ backgroundColor: 'rgba(0, 256, 0, 0.4)' }}>
                        <input type="Submit" onClick={event => editCategoryLogic(event, categoryName )} name="delete" defaultValue="Uložit" />
                    </div>
                    <div className="submit_booking red" style={{ backgroundColor: 'rgba(0, 0, 256, 0.4)' }}>
                        <input type="Submit" onClick={event => editCategory(event)} name="delete" defaultValue="Nová kat." />
                    </div>  
                </div>
            </form>

           : <form ref={form} name="formular" >
            <div className="form_booking" >


                    <input name="imgType" value={ editPhoto?.imgType ?? 'image/jpeg' } onChange={ change } hidden /> 
                    <input name="id" value={ editPhoto?.id ?? 0 } onChange={ change } hidden /> 
                    <div className="input_booking">
                        <label>Název</label>
                        <input value={ editPhoto?.header ?? 'loading...' } onChange={ change } placeholder="zadej název" name="header" size={34} />
                    </div>
                    <div className="input_booking" style={{ width: '40%' }}>
                        <label>Kategorie</label>
                        <select value={ editPhoto?.typ ?? '' } onChange={ change } name="typ">
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
                        <input name="date" value={ editPhoto?.date ?? '2021-01-01' } onChange={ change } size={10} type="date" />
                    </div>
                    <div className="input_booking">
                        <label>Popis</label>
                        <textarea value={ editPhoto?.text ?? 'loading...' } onChange={ change } name="text" rows={2} cols={60} placeholder="popis fotky"  wrap="Yes"></textarea>
                    </div>
                    <div className="input_booking" style={{ width: '40%' }}>
                        <label>Autor</label>
                        <input value={ editPhoto?.autor ?? 'loading...' } onChange={ change } name="autor" placeholder="autor" size={10} />
                    </div>
                    <div className="input_booking" style={{ width: '40%' }}>
                        <label>Email</label>
                        <input placeholder="email" name="email" value={ editPhoto?.email ?? 'loading...' } onChange={ change } size={20} />
                    </div>
                    <div className="input_booking">
                        <label>otoceni vlevo o kolik stupňů</label>
                        <input value={ editPhoto?.rotate ?? 0} onChange={ change } type="number" name="rotate" min="0" max="270" step="90"  />
                    </div>
                    <div className="input_booking">
                        <label>Vyberte foto { imgStatus() } </label>
                        <input type="file" name="upfile" accept="image/*" onChange={ onImageChange } />
                        { alert.header && <AlertBox alert={ alert } /> }
                    </div>
                    <div className="submit_booking green">
                        <input type="Submit" onClick={event => editLogic(event, form.current)} name="create" defaultValue="Přidej" />
                    </div>
                    <div className="submit_booking blue">
                        <input type="Submit" onClick={event => editLogic(event, form.current)} name="update" defaultValue="Uprav" />
                    </div>
                    <div className="submit_booking red" style={{ backgroundColor: 'rgba(256, 0, 0, 0.4)' }}>
                        <input type="Submit" onClick={event => editLogic(event, form.current)} name="delete" defaultValue="Smaž" />
                    </div>


                { isCategory
                    ? null
                    : <div className="submit_booking red" style={{ backgroundColor: 'rgba(256, 0, 256, 0.4)' }}>
                        <input type="Submit" onClick={event => editCategory(event)} name="delete" defaultValue="Kategorie" />
                      </div>                
                }
            </div>
        </form>
        

    )
}