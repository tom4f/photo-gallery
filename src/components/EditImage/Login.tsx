import { useRef } from "react"
import { LoginType, AlertType } from './../../TypeDefinition'
import { AlertBox } from './AlertBox'
import './AlertBox.css'

export const Login = ( {login, alert}: {login: LoginType, alert: AlertType} ) => {

    const form = useRef<HTMLFormElement>(null)

    return (
        <form ref={form} onSubmit={ event => login(event, form.current ) } name="login">
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