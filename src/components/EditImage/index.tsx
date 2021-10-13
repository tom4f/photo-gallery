import { useState, useEffect } from 'react'
import { changeType, editImage, LoginType } from './../../TypeDefinition'
import { Login } from './Login'
import { Formular } from './Formular'
import { serverPath, fotoGalleryOwner } from './../../api/read'
import './EditImage.css'
import { Delay }    from './AlertBox';

export const EditImage = ( { editPhoto, setEditPhoto, setImgPosition }: editImage ) => {

    interface alertTypes {
        header : string;
        text   : string;
        color? : string;
    }

    const [ alert, setAlert ] = useState<alertTypes>( { header: '', text: '' } );
    // if 'alert' changed - wait 5s and clear 'alert'
    Delay( alert, setAlert );
   
    const [ loginData, setLoginData ]   = useState({
        isLogged : false,
        webToken : 'error',
        webAccess: 'error',
        webUser  : 'error'
    })

    useEffect( () => {
        const respObj = JSON.parse( sessionStorage.getItem('client') || '{}'  )
        setLoginData( respObj )
    }, [] )
  
    const change = (e:changeType) =>  setEditPhoto( orig => ( { ...orig, [e.target.name]: e.target.value } ) )

    const login: LoginType = async(event, formCurrent) => {
        event.preventDefault()

        if (null === formCurrent) return 

        const FD = new FormData(formCurrent)
        let object:{ [key: string]: string | File } = {}
        FD.forEach( (value, key) => object[key] = value )
        object['fotoGalleryOwner'] = fotoGalleryOwner

        if (!object.user || !object.password) {
            setAlert( { header: 'Uživatelské jméno / heslo', text: 'vyplňte údaje' } )
            return
        }

        if (!/^[a-zA-Z0-9\-_]{3,15}$/.test(object.user as string)) {
            setAlert( { header: 'Špatné jméno', text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - _ )' } )
            return
        } 

        if (!/^[a-zA-Z0-9.\-_]{3,15}$/.test(object.password as string)) {
            setAlert( { header: 'Špatné heslo!', text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - . _ )' } )
            return
        } 


        const startLogin = await fetch( `${serverPath}/foto_login.php`, {
            method: 'POST',
            body: JSON.stringify(object)
        })

        const respLogin = JSON.parse( await startLogin.text() )

        const [ webToken, webAccess, webUser ]   = respLogin

        if ( webToken.webToken === 'error' ) {
            setAlert( { header: 'Přihlášení se nepovedlo !', text: 'zkuste později...' } )
            return
        } else {
            const respObj = { ...webToken, ...webAccess, ...webUser, isLogged: true }
            setLoginData( respObj )
            sessionStorage.setItem('client', JSON.stringify( respObj ))
        }
    }

    const editLogic = (event: React.MouseEvent<HTMLInputElement>, formCurrent: HTMLFormElement | null):void => {
        event.preventDefault()
        const ajax = async( action:string ) => {

            if (null === formCurrent) return 

            const FD = new FormData(formCurrent)
            
            let object:{ [key: string]: string | File } = {}
            FD.forEach( (value, key) => object[key] = value )
            const fileName = object.upfile as File
            !fileName.name && FD.delete('upfile')
            FD.append('webToken' , loginData.webToken)
            FD.append('webAccess', loginData.webAccess)
            FD.append('webUser'  , loginData.webUser)
            
            const getId = await fetch( `${serverPath}/pdo_read_auto_increment.php`, {
                method: 'POST',
                body: JSON.stringify({ 'fotoGalleryOwner' : fotoGalleryOwner})
            })
            const respId = await getId.text()
            const id = JSON.parse(respId)[0].Auto_increment
            action === 'create' && FD.set('id', id)

            
            // const pairs = Array.from(FD.entries())

            const sendAction = await fetch( `${serverPath}/pdo_${action}_photogallery.php`, {
                method: 'POST',
                body: FD
            })
            const respAction = await sendAction.text()
            console.log('text: ' + respAction )

            setImgPosition( old => ( { ...old, reload: ++old.reload } ) )
        }
        const submitCliked = (event.target as HTMLButtonElement).name
        switch (submitCliked) {
            case 'update':
                ajax('update')
                console.log(submitCliked)
                break
            
            case 'delete':
                console.log(submitCliked)
                ajax('delete')
                break

            case 'create':
                console.log(submitCliked)
                ajax('create')
                break
            }

 }

    return (
        <>
            { loginData.isLogged
                ? <Formular editPhoto={editPhoto} setEditPhoto={setEditPhoto} change={change} editLogic={editLogic} />
                : <Login login={login} alert={ alert }/>
            }
        </>
    )
}