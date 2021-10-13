class urlParams {
    static get getSearchObj() {
        const search = window.location.search.substring(1)
        const searchObj: { [key: string] : string } = {}
        const searchArr = search.split('&')
        !!searchArr[0] && searchArr.forEach( (ittem) => {
            const [ key, value ] = ittem.split('=')
            searchObj[key] = value 
        })
        return {
            fotoGalleryOwner: searchObj.fotoGalleryOwner || '_ubytovani',
            editStatus      : searchObj?.edit === 'yes' ? true : false
        }
    }
}

export const { fotoGalleryOwner, editStatus } = urlParams.getSearchObj

const dev = process.env.NODE_ENV !== 'production'
export const serverPath = dev ? 'http://localhost/lipnonet/rekreace/api' : './../api'

export const imgFolder = dev ? `http://localhost/lipnonet/rekreace/fotogalerie${fotoGalleryOwner}` : `./../fotogalerie${fotoGalleryOwner}`

export const loadPicturesfromMySQL = () => fetch( `${serverPath}/pdo_read_foto${fotoGalleryOwner}.php` )
                                        .then(  response => response.json() )
                                        .catch( response => console.log( { response } ) )

export const loadPicturesfromMySQL1 = async () => {
    let resp
    try {
        resp = await fetch( `${serverPath}/pdo_read_foto${fotoGalleryOwner}.php` )
    } catch(err) {
        console.log( { err } )
    }

    return resp

}

export const categoryName:{ [key: number]: string } = { 
    0  : 'Ubytování',
    1  : 'Lipenská přehrada',
    2  : 'Příroda',
    3  : 'Obce',
    4  : 'Historie',
    5  : 'Sport',
    6  : 'Ostatní',
    10 : 'Kaliště - kniha',
    11 : 'Kaliště',
    99999 : 'Všechny'
}