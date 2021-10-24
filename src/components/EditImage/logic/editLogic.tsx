import { fotoGalleryOwner, serverPath } from '../../../api/read'
import { editLogicType } from './../../../TypeDefinition'

export const editLogic: editLogicType = async(event, formCurrent, setAlert, loginData, setImgPosition) => {

    event.preventDefault()
    const action = (event.target as HTMLButtonElement).name

    if ( !formCurrent ) return 

    setAlert( { header: 'Ukládám změny', text: 'malý moment...', color: 'lime' } )

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

    const sendAction = await fetch( `${serverPath}/pdo_${action}_photogallery.php`, {
        method: 'POST',
        body: FD
    })
    const respAction = await sendAction.json()
    console.log( respAction.message )

    setAlert( { header: 'Hotovo', text: ':-)', color: 'lime' } )
    setImgPosition( old => ( { ...old, reload: ++old.reload } ) )

}