import { useState, useEffect } from 'react'
import { imgFolder } from './../../api/read'
import './BigImages.css'
import { CategoryList } from './CategoryList'
import { photoType, imgPositionType, setStateType, categoryObjType } from './../../TypeDefinition';
import { Presentation } from './Presentation'
import { ChangeImage } from './ChangeImage'
import { InfoText } from './InfoText'
import { EditImage } from './../EditImage';
// npm install @types/styled-components
// npm install styled-components --save
import styled, { css } from 'styled-components' 

const BigImg = styled.main< { bgImgCss: any, editPhoto: any } >`
    & {  
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top center;
        height: calc(100vh - 77px);
        width: auto;
        max-width: 100%;
        position: relative;
        ${ ({bgImgCss, editPhoto}) => !(editPhoto?.url || editPhoto?.rotate) && css`
                background-image: url(${bgImgCss});
            `}
    }

    ${ ({bgImgCss, editPhoto}) => (editPhoto?.url || editPhoto?.rotate) && css`
        &:after {
            background-image: url(${bgImgCss});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: ${ +editPhoto?.rotate === 0 ? 'top' : 'bottom' } center;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;     
            transform: rotate(${-editPhoto?.rotate}deg);
        }`
    }
`

interface BigImageType {
    imgPosition    : imgPositionType;
    setImgPosition : setStateType;
    bigPhoto       : photoType;
    categoryObj    : categoryObjType;
    length         : number;
}

export const BigImage = ( {bigPhoto, imgPosition, setImgPosition, categoryObj, length}: BigImageType ) => {

    const [ fadeIn, setFadeIn ] = useState( 'fade-in' )
    const [ editPhoto, setEditPhoto ] = useState( bigPhoto )

    const bgImgCss = editPhoto?.url
                        ? (editPhoto.url)
                        : bigPhoto
                            ? `${imgFolder}/${bigPhoto.id}b.jpg`
                            : ({})

    useEffect( () => {
            setFadeIn('fade-in')
            setTimeout( () => setFadeIn(''), 500  )
    }, [bigPhoto])

    const isEdit = window.location.search.match(/edit=yes/)

    useEffect( () => setEditPhoto(bigPhoto), [bigPhoto])

    return (
        <BigImg bgImgCss={bgImgCss} editPhoto={editPhoto} className={ fadeIn }  >
            {/* <div className="homepage"><a href="index.php">Ubytování u Kučerů</a></div> */}
            <InfoText bigPhoto={bigPhoto} />
            <ChangeImage  setImgPosition={setImgPosition} length={length} imgPosition={imgPosition}  />
            <Presentation setImgPosition={setImgPosition} length={length} /> 
            <CategoryList setImgPosition={setImgPosition} categoryObj={categoryObj} />

            { isEdit ? <EditImage editPhoto={editPhoto} setEditPhoto={setEditPhoto} /> : null }
        </BigImg>
    )
}