import { useState, useEffect } from "react"
import { AlertType, categoryNameType, EditCategoryType, categoryChangeType } from './../../TypeDefinition'
import { AlertBox, Delay } from './AlertBox'
import { readCategoryName } from '../../api/read'
import { editCategoryLogic, addCategoryLogic } from './logic/editCategoryLogic'

export const EditCategory = ( {categoryObj, setImgPosition, editCategory}: EditCategoryType ) => {

    const [ categoryName, setCategoryName ] = useState<categoryNameType | null>( null )
    const [ alert, setAlert ] = useState<AlertType>( { header: '', text: '' } );
    Delay( alert, setAlert );

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
                    <input value={ categoryName?.[+key] ?? '' } onChange={ categoryChange }  name={`name-${key}`} placeholder="text" size={10} />
                </div>
                <article>{value}x</article>
            </div>
        )
    }

    useEffect( () => { ( async() => setCategoryName( await readCategoryName() ) )() }, [] )

    return (
        <form name="formularCategory" >
            <div className="form_booking" >
            { alert.header && <AlertBox alert={ alert } /> }
                <div className="input_booking">
                    <section className="categoryListEdit">    
                        {category}
                    </section>
                </div>
                <div className="submit_booking red" style={{ backgroundColor: 'rgba(256, 0, 256, 0.4)' }}>
                    <input type="Submit" onClick={event => editCategory(event)} defaultValue="Zpět Foto" />
                </div>
                <div className="submit_booking red" style={{ backgroundColor: 'rgba(0, 256, 0, 0.4)' }}>
                    <input type="Submit" onClick={event => editCategoryLogic(event, categoryName, setAlert )} defaultValue="Uložit" />
                </div>
                <div className="submit_booking red" style={{ backgroundColor: 'rgba(0, 0, 256, 0.4)' }}>
                    <input type="Submit" onClick={event => addCategoryLogic(event, setCategoryName )} defaultValue="Nová kat." />
                </div>  
            </div>
        </form>
    )
}
