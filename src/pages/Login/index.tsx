import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import Input from '../../components/Input'

import heartIcon from '../../assets/images/icons/purple-heart.svg'
import Aside from '../../components/Aside'

function Login() {
    return (
        <div id="page-login" className="login-form">
            
            <Aside />
            
            <section>
                <div className="form-content">
                    <h2>Fazer login</h2>

                    <Input label="" name="email" placeholder="Email" />

                    <div className="password-input">
                        <Input label="" name="password" placeholder="Senha"/>
                        <img src={heartIcon} alt="show password" />
                    </div>
                    

                    <div className="login-options">
                        <div className="select-button">
                            <input type="checkbox" name="lembrar-senha" />
                            <label htmlFor="lembrar-senha">
                                Lembrar login
                            </label>
                        </div>

                        <Link to="/reset-password">
                            Esqueci minha senha
                        </Link>
                    </div>

                    <button>
                        Enviar
                    </button>

                    <footer className="login-footer-section">
                        <div className="register-page">
                            <p>Não tem uma conta ainda?</p>
                            <Link to='/register'>
                                Cadastre-se
                            </Link>
                        </div>

                        <div className="gratis-info">
                            <p>É de graça</p>
                            <img src={heartIcon } alt="purple heart" />
                        </div>
                    </footer>
                </div>
            </section>
        </div>
    )
}

export default Login