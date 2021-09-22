import { useState } from 'react'
import { setStateType, categoryObjType} from './../../TypeDefinition'
import { categoryName } from './../../api/read'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'

interface eightPhotoTypes {
    setImgPosition  : setStateType;
    categoryObj     : categoryObjType;
}

export const CategoryList = ( { setImgPosition, categoryObj}: eightPhotoTypes ) => {
    const [ showCategory, setShowCategory ] = useState( false )
    const category = []
    const count = []
    for (const [key, value] of Object.entries( categoryObj ) ) {
        category.push(<p className="oneCategory" key={key} onClick={ () => setImgPosition( prev => ({ ...prev, category: +key, current: 0 }) ) }>{categoryName[+key]}</p>)
        count.push(   <p className="oneCategory" key={key} onClick={ () => setImgPosition( prev => ({ ...prev, category: +key, current: 0 }) ) }>{value}</p>)
    }

    return (
        <>
            <FontAwesomeIcon className="category" icon={ faAlignJustify } onMouseOver={ () => setShowCategory( true ) }  />
            { showCategory ?
            <section className="categoryList" onMouseLeave={ () => setShowCategory(false)} >
                <fieldset>
                    <legend>Kategorie / počet fotek</legend>
                    <section>    
                        <header>
                            {category}
                        </header>
                        <article>
                            {count}
                        </article>
                    </section>
                </fieldset>
            </section>
            : null }
        </>
    )
}