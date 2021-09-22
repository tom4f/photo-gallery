import { useState, Dispatch, SetStateAction } from 'react'
import { photoType, changeType } from './../../TypeDefinition'
import { Login } from './Login'
import { Formular } from './Formular'
import { serverPath } from './../../api/read'
import './EditImage.css'

export const EditImage = ( { editPhoto, setEditPhoto }: {
    editPhoto: photoType,
    setEditPhoto:Dispatch<SetStateAction<photoType>>
} ) => {

    const [ isLogged, setIsLogged ]   = useState( false )
  
    const change = (e:changeType) =>  setEditPhoto( orig => ( { ...orig, [e.target.name]: e.target.value } ) )

    const login = (event:any) => {
        event.preventDefault()
        console.log(event.nativeEvent.submitter.name)
        setIsLogged(true)
    }

    const edit = (event:any, formCurrent:any) => {
        event.preventDefault()
        console.log(event.nativeEvent.submitter.name)

        const FD = new FormData(formCurrent)

        fetch( `${serverPath}/pdo_update_photogallery.php`, { method: 'POST', body: FD } )
            .then(response => response.text())
            .then(data => { console.log('text: ' + data); })

        const pairs = Array.from(FD.entries())
        console.log( pairs )
    }

    return (
        <>
            { isLogged ? <Formular editPhoto={editPhoto} setEditPhoto={setEditPhoto} change={change} edit={edit} />
                       : <Login login={login} />
            }
        </>
    )
}