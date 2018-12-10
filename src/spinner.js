import React, {PureComponent} from 'react';

export default class Spinner extends PureComponent{
    render(){
        return(
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        )
    }
}
