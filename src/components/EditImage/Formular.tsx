import { formularType, changeType, AlertType } from './../../TypeDefinition'
import { useRef, useState } from 'react'
import { AlertBox, Delay } from './AlertBox'
import './../BigImage/CategoryListEdit.css'
import { editLogic } from './logic/editLogic'
import { EditCategory } from './EditCategory'
import { ImageChange } from './ImageChange'

export const Formular = ({editPhoto, setEditPhoto, setImgPosition, categoryObj, loginData} : formularType) => {

    const [ alert, setAlert ] = useState<AlertType>( { header: '', text: '' } );
    Delay( alert, setAlert );

    const [ isCategory, setIsCategory] = useState( false )
    const editCategory = (event:React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        setIsCategory( old => !old )
    }
    
    const change = (e:changeType) =>  setEditPhoto( orig => ( { ...orig, [e.target.name]: e.target.value } ) )
    
    const form = useRef<HTMLFormElement>(null)

    return (
        isCategory
           ? <EditCategory categoryObj={categoryObj} setImgPosition={setImgPosition} editCategory={editCategory} /> 

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

                    <ImageChange setEditPhoto={setEditPhoto} />
                    
                    { alert.header && <div className="input_booking">
                                        <AlertBox alert={ alert } />
                                      </div> }
                    <div className="submit_booking green">
                        <input type="Submit" onClick={event => editLogic(event, form.current, setAlert, loginData, setImgPosition)} name="create" defaultValue="Přidej" />
                    </div>
                    <div className="submit_booking blue">
                        <input type="Submit" onClick={event => editLogic(event, form.current, setAlert, loginData, setImgPosition)} name="update" defaultValue="Uprav" />
                    </div>
                    <div className="submit_booking red" style={{ backgroundColor: 'rgba(256, 0, 0, 0.4)' }}>
                        <input type="Submit" onClick={event => editLogic(event, form.current, setAlert, loginData, setImgPosition)} name="delete" defaultValue="Smaž" />
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