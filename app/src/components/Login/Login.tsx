import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../store/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthorizationProps } from "../Authorization/Authorization";
import { RootState } from "../../store/store";






const Login: React.FC<AuthorizationProps> = ({ setLoginModal }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid } } = useForm({
            defaultValues: {
                login: '',
                password: ''
            },
            mode: 'onChange'
        })


    const onSubmit = async (values: any) => {
        const data = await dispatch(fetchUserData(values))
        if (!data.payload) {
            return alert('Неверный логин или пароль!')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token' , data.payload.token)
        }
        

    }

    if (isAuth) {
        setLoginModal(false)
        return <Navigate to="/" />
    }


    return (
        <div className='login'>
            <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                <label>Логин</label>
                <input type="text" placeholder='Логин' {...register('login', { required: 'Укажите логин' })} />
                {errors.login && <div>{errors.login.message}</div>}
                <label>Пароль</label>
                <input type="password" placeholder='Пароль' {...register('password', { required: 'Укажите пароль' })} />
                {errors.password && <div>{errors.password.message}</div>}
                <button type="submit">Войти</button>
            </form>

        </div>
    );
};

export default Login;