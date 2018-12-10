import React, {PureComponent} from 'react'

export class Input extends PureComponent {
    state = {
        message: ''
    };

    setMessage = (event) => {
        this.setState({
            message: event.target.value
        })
    };

    dispatchMessage = (event) => {
        event.preventDefault();

        let value = this.state.message;
        if (value === '') {
            value = this.props.defaultValue;
        }

        this.props.action(value);

        this.setState({
            message: ''
        })
    };

    render() {
        const style = {
            border: 'none',
            outline: 0,
            fontSize: 'inherit',
            textAlign: 'center',
            color:'#43505D',
            width: '100%',
            height: '100%',
            ...this.props.style,
        };
        return (
            <form onSubmit={this.dispatchMessage}>
                <div className={"login"}>
                    <div className="input">
                        <input
                            type="text"
                            style={style}
                            value={this.state.message}
                            placeholder={this.props.placeholder}
                            className="form-control is-valid"
                            id="inputValid"
                            onChange={this.setMessage}
                        />
                    </div>
                    <div className={"button"}>
                        <div className={"button-text"} onClick={this.dispatchMessage}>
                            {this.props.sendingIcon}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default class Login extends PureComponent {

    saveUser = (e) => {
        localStorage.setItem('user', e);
        console.log(localStorage.getItem('user'));
        this.props.onLogin();
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">UAI 624 CHAT APP</div>
                <div className="card-body">
                    <div className={"title"}> Zadej své jméno</div>
                    <Input action={this.saveUser} placeholder={"Luke Skywalker"} defaultValue={"Luke Skywalker"} sendingIcon={'✔'}/>
                </div>
            </div>
        );
    }
}
