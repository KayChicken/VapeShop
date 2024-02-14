import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';





const Registration = () => {

    const [email, setEmail] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const [emailDirty, setEmailDirty] = useState<boolean>(false)
    const [loginDirty, setLoginDirty] = useState<boolean>(false)
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false)
    const [repeatPasswordDirty, setRepeatPasswordDirty] = useState<boolean>(false)

    const [emailError, setEmailError] = useState<string>("Email не может быть пустой")
    const [loginError, setLoginError] = useState<string>("Логин не может быть пустой")
    const [passwordError, setPasswordError] = useState<string>("Пароль не может быть пустым")
    const [repeatPasswordError, setRepeatPasswordError] = useState<string>("Введите повторно пароль")
    const [formValid, setFormValid] = useState<boolean>(false)



    useEffect(() => {
        if (emailError || passwordError || loginError || repeatPasswordError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }

    }, [emailError, loginError, passwordError, repeatPasswordError])


    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Введен некорректный email")
        }
        else {
            setEmailError('')
        }
    }

    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        if (e.target.value.length < 3) {
            setLoginError("Логин слишком короткий")
        }
        else {
            setLoginError("")
        }
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3) {
            setPasswordError("Пароль слишком короткий")
        }
        else {
            setPasswordError("")
        }
    }

    const repeatPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
        if (password !== e.target.value) {
            setRepeatPasswordError("Пароли не совпадают")
        }
        else {
            setRepeatPasswordError("")
        }
    }




    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'login':
                setLoginDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            case 'repeat-password':
                setRepeatPasswordDirty(true);
                break;

        }
    }


    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            email,
            login,
            password,
        };
        try {
            const response = await axios.post('/authorization/registration', data);
            
            
        } catch (error) {
            console.error('Регистрация не удалась:', error);
      
        }
    };







    return (
        <div className='registration'>
            <form className='login-form' onSubmit={submitHandler}>
                <label>Электронная почта</label>
                <input value={email} onChange={(e) => { emailHandler(e) }} type="email" name="email" placeholder='Электронная почта' onBlur={(e) => { blurHandler(e) }} />
                {(emailDirty && emailError) && <div className='error-line'>{emailError}</div>}
                <label>Логин</label>
                <input value={login} onChange={(e) => { loginHandler(e) }} type="text" name="login" placeholder='Логин' onBlur={(e) => { blurHandler(e) }} />
                {(loginDirty && loginError) && <div className='error-line'>{loginError}</div>}
                <label>Пароль</label>
                <input value={password} onChange={(e) => { passwordHandler(e) }} type="password" name="password" placeholder='Пароль' onBlur={(e) => { blurHandler(e) }} />
                {(passwordDirty && passwordError) && <div className='error-line'>{passwordError}</div>}
                <label>Повторите пароль</label>
                <input value={repeatPassword} onChange={(e) => { repeatPasswordHandler(e) }} type="password" name="repeat-password" placeholder='Повторите пароль' onBlur={(e) => { blurHandler(e) }} />
                {(repeatPasswordDirty && repeatPasswordError) && <div className='error-line'>{repeatPasswordError}</div>}
                <button disabled={!formValid} className={formValid ? '' : 'disable'} type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;