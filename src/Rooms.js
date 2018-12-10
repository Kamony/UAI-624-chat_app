import React, {PureComponent} from 'react';
import Axios from "axios";
import {Animated} from "react-animated-css";
import Spinner from "./spinner";

export const instance = Axios.create({
    baseURL: 'https://api.uai.urbec.org/chat/v1',
    timeout: 1000,
    headers: {
        'Authorization': 'Bearer uai-624',
    }
});


export default class Rooms extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };
    }


    componentDidMount() {
        instance.get('/rooms').then(response => {
            this.setState({
                rooms: response.data.rooms
            });
        }).catch(
            this.setState({
                rooms: null
            })
        )
    }

    handleClick = (e) => {
        const id = e.currentTarget.dataset.id;
        this.props.chooseRoom(id);
    };

    renderRooms = () => {
        return (
            this.state.rooms.map((room, index) => {
                console.log('room', room.id, 'selected: ', this.props.selected);
                let style = parseInt(room.id) !== parseInt(this.props.selected) ? 'room' : 'selected-room';
                console.log('style for room ', room.name, ' is ', style);
                return(
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} key={index}>
                        <div
                            className={style}
                            onClick={this.handleClick}
                            data-id={room.id}
                        >
                            {room.name}
                        </div>
                    </Animated>
                )}
            )
        )
    }

    render() {
        console.log("render with selected room ", this.props.selected);
        return (
            <div>
                <div className={"header line"}>Chatovací místnosti</div>
                <hr/>
                <div className="rooms">
                    {this.state.rooms === null && <Spinner />}
                    {this.state.rooms !== null && this.renderRooms()}
                </div>
            </div>
        )
    }
}
