import { useState, useEffect } from 'react'
import { imgFolder } from './api/read'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentMedical, faCommentSlash, faArrowLeft, faArrowRight, faAngleDoubleLeft, faPlayCircle,
         faStopCircle, faAngleDoubleRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import './css/BigImages.css'
import { CategoryList } from './CategoryList'
import { photoType, imgPositionType, setStateType, categoryObjType } from './TypeDefinition';

interface eightPhotoTypes {
    imgPosition    : imgPositionType;
    setImgPosition : setStateType;

    bigPhoto       : photoType;
    categoryObj    : categoryObjType;
    length         : number;
}

export const BigImage = ( {bigPhoto, imgPosition, setImgPosition, categoryObj, length }: eightPhotoTypes ) => {
    const { current, smallImgsSize } = imgPosition
    const [ showInfo, setShowInfo ] = useState( true )
    const [ showCategory, setShowCategory ] = useState( false )
    const [ presentation, setPresentation ] = useState( false )
    const [ timer, setTimer ] = useState<NodeJS.Timeout | null>( null )
    const [ fadeIn, setFadeIn ] = useState( 'main-img fade-in' )
    const bgImgCss   = bigPhoto ? ({ backgroundImage: `url(${imgFolder}/${bigPhoto.id}b.jpg)` }) : ({})
    const bigImgInfo = bigPhoto ? <><b>{bigPhoto.id}</b> {bigPhoto.insertDate.slice(0,10)} <b>{bigPhoto.header}</b> Autor: {bigPhoto.autor} 
                                    <br />{bigPhoto.text}</>
                                : null

    const changePhoto = ( newCurrent:number ) => {
        if ( newCurrent >= 0 && newCurrent < length)  {
            setImgPosition( (old) => {
                const newSmallImgStart =  newCurrent - newCurrent % smallImgsSize
                return ({ ...old, smallImgStart: newSmallImgStart, current: newCurrent })
            })
        }
    }

    useEffect( () => {
            setFadeIn('main-img fade-in')
            setTimeout( () => setFadeIn('main-img'), 500  )
    }, [bigPhoto])

    const startPresentation = () => {
        const timer: ReturnType<typeof setInterval> = setInterval( () => {
            const current = Math.floor(Math.random() * length)
            setImgPosition( (old) => ({ ...old, current }) ) 
        }, 5000 )
        setTimer( timer )
        setPresentation( true )
        
    }

    const stopPresentation = () => {
        setPresentation( false )
        if (timer) clearInterval(timer)
    }

    return (
        <main className={ fadeIn } style={bgImgCss} >
            { showInfo ? <div className="photoInfo">{bigImgInfo}</div> : null }
            <div className="homepage"><a href="index.php">Ubytování u Kučerů</a></div>
            { showInfo ? <FontAwesomeIcon className="textOff" icon={ faCommentSlash }  onClick={ () => setShowInfo(false) }  />
                       : <FontAwesomeIcon className="textOn" icon={ faCommentMedical } onClick={ () => setShowInfo(true) } /> }
            <FontAwesomeIcon className="prevPhoto" icon={ faArrowLeft } onClick={ () => changePhoto( current-1 ) }  />
            <FontAwesomeIcon className="nextPhoto" icon={ faArrowRight } onClick={ () => changePhoto( current+1 ) } />
            <FontAwesomeIcon className="prevPhotoBig" icon={ faArrowLeft } onClick={ () => changePhoto( current-1 ) } />
            <FontAwesomeIcon className="nextPhotoBig" icon={ faArrowRight }  onClick={ () => changePhoto( current+1 ) }  />
            <FontAwesomeIcon className="prev8" icon={ faAngleDoubleLeft } onClick={ () => changePhoto( current-8 ) } />
            { presentation ? <FontAwesomeIcon className="stop" icon={ faStopCircle} onClick={ () => stopPresentation() } />
                           : <FontAwesomeIcon className="play" icon={ faPlayCircle } onClick={ () => startPresentation() } /> }
            
            
            <FontAwesomeIcon className="next8" icon={ faAngleDoubleRight } onClick={ () => changePhoto( current+8 ) } />
            <FontAwesomeIcon className="category" icon={ faAlignJustify } onMouseOver={ () => setShowCategory( true ) }  />
            { showCategory ? <CategoryList setImgPosition={setImgPosition} setShowCategory={setShowCategory} categoryObj={categoryObj} /> : null }
        </main>
    )
}