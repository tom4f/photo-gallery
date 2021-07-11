const dev = process.env.NODE_ENV !== 'production'
const serverPath = dev ? 'http://localhost/lipnonet/rekreace/api' : './../api'

export const imgFolder = dev ? 'http://localhost/lipnonet/rekreace/fotogalerie_tomas' : './../fotogalerie_tomas'

export const loadPicturesfromMySQL = fetch( `${serverPath}/pdo_read_foto_tomas.php` )
                                        .then(  response => response.json() )
                                        .catch( response => console.log( { response } ) )