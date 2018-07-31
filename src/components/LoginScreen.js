import React from 'react'
import TextInput from './TextInput'
import { binder } from '../helper'

class LoginScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      email: '',
      senha: ''
    }

    binder(this)
  }

  performLogin() {
    const { email, senha } = this.state

    console.log(email)
    console.log(senha)
  }

  render() {
    return (
      <div>
        <h3>Bem vindo ao Bolão Feevale</h3>

        <TextInput
          label="E-mail"
          type="email"
          callback={email => this.setState({email})}
        />

        <TextInput
          label="Senha"
          type="password"
          callback={senha => this.setState({senha})}
        />

        <button onClick={this.performLogin}>Entrar</button>
      </div>
    )
  }
}

export default LoginScreen
