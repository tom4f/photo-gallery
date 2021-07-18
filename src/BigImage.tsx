import { useState, useEffect } from 'react'
import { imgFolder } from './api/read'
import './css/BigImages.css'
import { CategoryList } from './CategoryList'
import { photoType, imgPositionType, setStateType, categoryObjType } from './TypeDefinition';
import { Presentation } from './Presentation'
import { ChangeImage } from './ChangeImage'
import { InfoText } from './InfoText'

interface BigImageType {
    imgPosition    : imgPositionType;
    setImgPosition : setStateType;
    bigPhoto       : photoType;
    categoryObj    : categoryObjType;
    length         : number;
}

export const BigImage = ( {bigPhoto, imgPosition, setImgPosition, categoryObj, length}: BigImageType ) => {

    const [ fadeIn, setFadeIn ] = useState( 'main-img fade-in' )
    const bgImgCss = bigPhoto
                   ? ({ backgroundImage: `url(${imgFolder}/${bigPhoto.id}b.jpg)` })
                   : ({})

    useEffect( () => {
            setFadeIn('main-img fade-in')
            setTimeout( () => setFadeIn('main-img'), 500  )
    }, [bigPhoto])

    return (
        <main className={ fadeIn } style={bgImgCss} >
            {/* <div className="homepage"><a href="index.php">Ubytování u Kučerů</a></div> */}
            <InfoText bigPhoto={bigPhoto} />
            <ChangeImage  setImgPosition={setImgPosition} length={length} imgPosition={imgPosition}  />
            <Presentation setImgPosition={setImgPosition} length={length} /> 
            <CategoryList setImgPosition={setImgPosition} categoryObj={categoryObj} />
        </main>
    )
}