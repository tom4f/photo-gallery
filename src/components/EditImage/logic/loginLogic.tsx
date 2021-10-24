import { serverPath, fotoGalleryOwner } from './../../../api/read'
import { loginLogicType } from './../../../TypeDefinition'

export const loginLogic: loginLogicType = async(event, formCurrent, setAlert, setLoginData) => {
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

    const [ webToken, webAccess, webUser ] = respLogin

    if ( webToken.webToken === 'error' ) {
        setAlert( { header: 'Přihlášení se nepovedlo !', text: 'zkuste později...' } )
        return
    } else {
        const respObj = { ...webToken, ...webAccess, ...webUser, isLogged: true }
        setLoginData( respObj )
        sessionStorage.setItem('client', JSON.stringify( respObj ))
    }
}