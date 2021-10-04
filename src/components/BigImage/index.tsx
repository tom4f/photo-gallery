import { useState, useEffect } from 'react'
import { CategoryList } from './CategoryList'
import { BigImageType } from './../../TypeDefinition';
import { Presentation } from './Presentation'
import { ChangeImage } from './ChangeImage'
import { InfoText } from './InfoText'
import { EditImage } from './../EditImage';
import { BigImg } from './BigImg.styled' 
import './BigImages.css'

export const BigImage = ( {bigPhoto, imgPosition, setImgPosition, categoryObj, length}: BigImageType ) => {

    const [ fadeIn, setFadeIn ] = useState( true )
    const [ editPhoto, setEditPhoto ] = useState( bigPhoto )
    const [ isEdit, setIsEdit] = useState( false )

    useEffect( () => setIsEdit( !!window.location.search.match(/edit=yes/) ), [] )

    useEffect( () => {
            setFadeIn(true)
            setTimeout( () => setFadeIn(false), 500  )
            isEdit && setEditPhoto(bigPhoto)
    }, [ bigPhoto, isEdit ])

    return (
        <BigImg bigPhoto={bigPhoto} editPhoto={editPhoto} className={`main-img`} fadeIn={fadeIn} imgPosition={imgPosition}   >
            <InfoText bigPhoto={bigPhoto} />
            <ChangeImage  setImgPosition={setImgPosition} length={length} imgPosition={imgPosition}  />
            <Presentation setImgPosition={setImgPosition} length={length} /> 
            <CategoryList setImgPosition={setImgPosition} categoryObj={categoryObj} />
            { isEdit && <EditImage setImgPosition={setImgPosition} editPhoto={editPhoto} setEditPhoto={setEditPhoto} /> }
        </BigImg>
    )
}