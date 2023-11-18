import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login-page.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import FormControl from '@mui/material/FormControl';
import {IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage({onLogin}: any) {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const submit = async () => {
        if (login.length > 0 && password.length > 0) {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/auth/login`, {
                email: login,
                password: password
            }, {withCredentials: true})

            onLogin(response.data.id)
            if (response.status === 200) {
                navigate("/")
            }
        }
    };

    return (
        <div className='wrapper_login'>
            <TextField
                required
                id="outlined-required"
                label="Логин"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
            />
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Button variant="contained" onClick={() => submit()}>Войти</Button>
        </div>
    );
}
