import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentMedical, faCommentSlash } from '@fortawesome/free-solid-svg-icons'
import { photoType } from './../../TypeDefinition';

interface eightPhotoTypes {
    bigPhoto       : photoType;
}

export const InfoText = ( {bigPhoto}: eightPhotoTypes ) => {

    const [ showInfo, setShowInfo ] = useState( true )
    
    const bigImgInfo = bigPhoto && <>
                                    <b>{bigPhoto.id}</b> {bigPhoto.insertDate.slice(0,10)} <b>{bigPhoto.header}</b> Autor: {bigPhoto.autor} 
                                    <br />{bigPhoto.text}
                                  </>
                                

    return (
        <>
            { showInfo ? <div className="photoInfo">{bigImgInfo}</div> : null }
            { showInfo ? <FontAwesomeIcon className="textOff" icon={ faCommentSlash }   onClick={ () => setShowInfo(false) } />
                       : <FontAwesomeIcon className="textOn"  icon={ faCommentMedical } onClick={ () => setShowInfo(true)  } /> }
        </>
    )
}