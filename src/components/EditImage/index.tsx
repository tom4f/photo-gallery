import { useState } from 'react'
import { changeType, editImage, LoginType } from './../../TypeDefinition'
import { Login } from './Login'
import { Formular } from './Formular'
import { serverPath } from './../../api/read'
import './EditImage.css'

export const EditImage = ( { editPhoto, setEditPhoto, setImgPosition }: editImage ) => {

    const [ loginData, setLoginData ]   = useState({
        isLogged : false,
        webToken : 'error',
        webAccess: 'error',
        webUser  : 'error'
    })
  
    const change = (e:changeType) =>  setEditPhoto( orig => ( { ...orig, [e.target.name]: e.target.value } ) )

    const login: LoginType = async(event, formCurrent) => {
        event.preventDefault()

        if (null === formCurrent) return 

        const FD = new FormData(formCurrent)
        let object:{ [key: string]: string | File } = {}
        FD.forEach( (value, key) => object[key] = value )
        object['fotoGalleryOwner'] = '_ubytovani';

        const startLogin = await fetch( `${serverPath}/foto_login.php`, {
            method: 'POST',
            body: JSON.stringify(object)
        })

        const respLogin = JSON.parse( await startLogin.text() )

        const [ webToken, webAccess, webUser ]   = respLogin

        webToken.webToken !== 'error' && setLoginData( ({ ...webToken, ...webAccess, ...webUser, isLogged: true }) )
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
                body: JSON.stringify({ 'fotoGalleryOwner' : '_ubytovani'})
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
            { loginData.isLogged ? <Formular editPhoto={editPhoto} setEditPhoto={setEditPhoto} change={change} editLogic={editLogic} />
                       : <Login login={login} />
            }
        </>
    )
}