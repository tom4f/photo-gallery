const fotoGalleryOwner =  window.location.search.split('fotoGalleryOwner=')[1] || '_ubytovani'

const dev = process.env.NODE_ENV !== 'production'
export const serverPath = dev ? 'http://localhost/lipnonet/rekreace/api' : './../api'

export const imgFolder = dev ? `http://localhost/lipnonet/rekreace/fotogalerie${fotoGalleryOwner}` : `./../fotogalerie${fotoGalleryOwner}`

export const loadPicturesfromMySQL = fetch( `${serverPath}/pdo_read_foto${fotoGalleryOwner}.php` )
                                        .then(  response => response.json() )
                                        .catch( response => console.log( { response } ) )

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