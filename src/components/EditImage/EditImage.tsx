import { useState, useEffect } from 'react'
import { editImage } from '../../TypeDefinition'
import { Login } from './Login'
import { Formular } from './Formular'
import { fotoGalleryOwner } from '../../api/read'
import './EditImage.css'

export const EditImage = ( { editPhoto, setEditPhoto, setImgPosition, categoryObj }: editImage ) => {
   
    const [ loginData, setLoginData ]   = useState({
        isLogged : false,
        webToken : 'error',
        webAccess: 'error',
        webUser  : 'error'
    })

    const applySessionStorageLoginData = (): void => {
        const clientJSON = sessionStorage.getItem('client')
        if ( !clientJSON ) return
        const clientObj = JSON.parse( clientJSON );
        (fotoGalleryOwner === clientObj.webAccess) && setLoginData( clientObj )   
    }

    useEffect( () => applySessionStorageLoginData() , [] )
  
    return (
        <>
            { loginData.isLogged
                ? <Formular editPhoto={editPhoto} setEditPhoto={setEditPhoto}
                            loginData={loginData}
                            setImgPosition={setImgPosition} categoryObj={categoryObj} />
                : <Login setLoginData={setLoginData}/>
            }
        </>
    )
}