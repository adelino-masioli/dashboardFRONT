import './auth.css'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/layoutGrid'
import If from '../common/operator/if'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit(values) {
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values)
    }

    render() {
        const { loginMode } = this.state
        const { handleSubmit } = this.props
        return (
            <div className="login-box">
                <div className="login-logo"><img src={require('./../assets/brand-gray.png')} alt=""/></div>
                <div className="login-box-body">
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <div className='alert alert-info alert-login'>Please login with your Username and Password.</div>
                        <Field component={Input} type="email" name="email"
                            placeholder="E-mail" icon='envelope' />
                        <Field component={Input} type="password" name="password"
                            placeholder="Password" icon='lock' />
                        <Row>
                            <Grid cols="12">
                                <button type="submit"
                                    className="btn btn-primary btn-block btn-flat">
                                    Login
                                </button>
                            </Grid>
                        </Row>
                    </form>
                </div>
                <Messages />
            </div>
        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)