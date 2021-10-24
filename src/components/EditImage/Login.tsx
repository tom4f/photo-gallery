import { useRef, useState } from "react"
import { LoginType, AlertType } from './../../TypeDefinition'
import { AlertBox, Delay } from './AlertBox'
import { loginLogic } from './logic/loginLogic'

export const Login = ( {setLoginData}: LoginType ) => {

    const [ alert, setAlert ] = useState<AlertType>( { header: '', text: '' } );
    // if 'alert' changed - wait 5s and clear 'alert'
    Delay( alert, setAlert );

    const form = useRef<HTMLFormElement>(null)

    return (
        <form ref={form} onSubmit={ event => loginLogic(event, form.current, setAlert, setLoginData ) } name="login">
            <div className="form_booking">
                <div className="input_booking">
                    <label>Zadejte uživatelské jméno</label>
                    <input name="user" type="text" placeholder="uživatel" size={10} />
                </div>
                <div className="input_booking">
                    <label>Zadejte heslo</label>
                    <input name="password" type="password" placeholder="heslo" size={10} autoComplete="off"/>
                </div>
                { alert.header ? <AlertBox alert={ alert } /> : null }
                <div className="submit_booking green">
                    <input type="submit" name="login" />
                </div>
            </div>
        </form>
    )
}