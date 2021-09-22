
export const Login = ({login}:{login:any}) => {

    return (
            <form onSubmit={ login } name="login">
                <div className="form_booking">
                    <div className="input_booking">
                        <label>Zadejte uživatelské jméno</label>
                        <input name="user" type="text" placeholder="uživatel" size={10} />
                    </div>
                    <div className="input_booking">
                        <label>Zadejte heslo</label>
                        <input name="password" type="password" placeholder="heslo" size={10} autoComplete="off"/>
                    </div>
                    <div className="submit_booking">
                        <input type="submit" name="login" />
                    </div>
                </div>
            </form>
    )
}