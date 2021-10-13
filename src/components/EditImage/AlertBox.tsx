import { useEffect } from 'react';

export const AlertBox = ( { alert: { header = '', text = '', color= 'red' } } ) => {

    console.log(`${header} - ${text}`);
    return (
        header ? <article className="alert" style={ { color } }>
                    <header className="header">{`${header}`}</header>
                    <header className="text">  {`${text}`  }</header>
                 </article>
               : null
    );
};


export const Delay = ( alert = { header: '', text: '' }, setAlert: Function ): void => {
    
    const delay = () => {
        const timeout = setTimeout( () => {
            setAlert( { header: '', text: '' } );
        }, 5000 );
        return () => clearTimeout( timeout );
    }
    useEffect( delay, [ alert, setAlert ] );
}