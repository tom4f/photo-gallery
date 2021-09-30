import { useState, useEffect } from 'react'
import { imgFolder } from './../../api/read'
import './BigImages.css'
import { CategoryList } from './CategoryList'
import { photoType, imgPositionType, setStateType, categoryObjType } from './../../TypeDefinition';
import { Presentation } from './Presentation'
import { ChangeImage } from './ChangeImage'
import { InfoText } from './InfoText'
import { EditImage } from './../EditImage';
import styled, { css } from 'styled-components' 

const BigImg = styled.main< { editPhoto: any, bigPhoto:any, fadeIn:boolean } >`
 
    ${ ({bigPhoto, editPhoto, fadeIn}) => ( bigPhoto && !editPhoto) && css`
        & { 
            background-image: url(${ `${imgFolder}/${bigPhoto?.id}b.jpg` });
            ${ fadeIn && css`
                opacity: 0;
                animation: fadeIn 0.5s ease-in 1 forwards;
            `}
        `}
    }

    ${ ({bigPhoto, editPhoto, fadeIn}) => editPhoto && css`
        &::after {
            background-image: url(${ editPhoto?.url || `${imgFolder}/${bigPhoto?.id}b.jpg` });
            background-position: ${ (+editPhoto?.rotate ===   0 && 'top    center') ||
                                    (+editPhoto?.rotate ===  90 && 'center center') ||
                                    (+editPhoto?.rotate === 180 && 'bottom center') ||
                                    (+editPhoto?.rotate === 270 && 'center center')
                                 };
            transform: rotate(${-editPhoto?.rotate}deg);
            ${ fadeIn && css`
                opacity: 0;
                animation: fadeIn 0.5s ease-in 1 forwards;
            `}
        }`
    }
`

interface BigImageType {
    imgPosition    : imgPositionType;
    setImgPosition : setStateType;
    bigPhoto       : photoType;
    categoryObj    : categoryObjType;
    length         : number;
    setAllPhoto    : React.Dispatch<React.SetStateAction<photoType[]>>
}

export const BigImage = ( {bigPhoto, imgPosition, setImgPosition, categoryObj, length, setAllPhoto}: BigImageType ) => {

    const [ fadeIn, setFadeIn ] = useState( true )
    const [ editPhoto, setEditPhoto ] = useState( bigPhoto )
    const [ isEdit, setIsEdit] = useState( false )

    useEffect( () => setIsEdit( !!window.location.search.match(/edit=yes/) ), [] )

    useEffect( () => {
            setFadeIn(true)
            setTimeout( () => setFadeIn(false), 500  )
            isEdit && setEditPhoto(bigPhoto)
    }, [bigPhoto, isEdit ])

    return (
        <BigImg bigPhoto={bigPhoto} editPhoto={editPhoto} className={ `main-img` } fadeIn={fadeIn}  >
            {/* <div className="homepage"><a href="index.php">Ubytování u Kučerů</a></div> */}
            <InfoText bigPhoto={bigPhoto} />
            <ChangeImage  setImgPosition={setImgPosition} length={length} imgPosition={imgPosition}  />
            <Presentation setImgPosition={setImgPosition} length={length} /> 
            <CategoryList setImgPosition={setImgPosition} categoryObj={categoryObj} />
            { isEdit && <EditImage setImgPosition={setImgPosition} editPhoto={editPhoto} setEditPhoto={setEditPhoto} /> }
        </BigImg>
    )
}