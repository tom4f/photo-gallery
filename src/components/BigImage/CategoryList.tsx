import { useState, useEffect } from 'react'
import { setStateType, categoryObjType, categoryNameType } from './../../TypeDefinition'
import { readCategoryName } from './../../api/read'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import './CategoryList.css'

interface eightPhotoTypes {
    setImgPosition  : setStateType;
    categoryObj     : categoryObjType;
}

export const CategoryList = ( { setImgPosition, categoryObj}: eightPhotoTypes ) => {
    const [ showCategory, setShowCategory ] = useState( false )
    const [ categoryName, setCategoryName ] = useState<categoryNameType | null>( null )

    const category = []

    for (const [key, value] of Object.entries( categoryObj ) ) {
        const changeCategory = () => setImgPosition( prev => ({ ...prev, category: +key, smallImgStart:0, current: 0 }) )
        category.push(
            <div className="oneCategory" key={key} onClick={ changeCategory }>
                <header>{ categoryName?.[+key] ?? 'loading' }</header>
                <article>{value}</article>
            </div>
        )
    }

    useEffect( () => { ( async() => setCategoryName( await readCategoryName() ) )() }, [] )

    return (
        <>
            <FontAwesomeIcon className="category" icon={ faAlignJustify } onMouseOver={ () => setShowCategory( true ) }  />
            { showCategory ?
            <div className="categoryList" onMouseLeave={ () => setShowCategory(false)} >
                <fieldset>
                    <legend>Kategorie / počet fotek</legend>
                    <section>    
                            {category}
                    </section>
                </fieldset>
            </div>
            : null }
        </>
    )
}