import React, {PureComponent} from 'react';
import {instance} from './Rooms';
import {Input} from "./Login";
import {Animated} from "react-animated-css";
import moment from "moment";
import Spinner from "./spinner";

export default class MessageRoom extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            ready: false,
            limit: 20,
            canFetchMore: true,
            room: this.props.room,
        };
        this.fetchedMessages = []
    }

    areDifferentByIds = (a, b) => {
        const idsA = a.map(function (x) {
            return x.id;
        }).sort();
        const idsB = b.map(function (x) {
            return x.id;
        }).sort();
        return (idsA.join(',') !== idsB.join(','));
    }

    getMessages = (id) => {
        if (id != parseInt(this.state.room)) {
            this.setState({
                room: id,
                messages: [],
                ready: false,
            });
        }
        instance.get(`/rooms/${id}/messages`)
            .then(response => {
                this.fetchedMessages = response.data.messages;
                console.log("fetched");
                if (this.areDifferentByIds(this.state.messages, this.fetchedMessages)) {
                    this.setState({
                        messages: this.fetchedMessages,
                        ready: true
                    });
                    this.end.scrollIntoView({behavior: "smooth"})
                }
            })
            .catch(
                err => {
                    console.log(err);
                }
            )
    }

    sendMessage = (message) => {
        console.log(message);
        if (message === '' || message === undefined) {
            return
        }

        const payload = {
            username: localStorage.getItem('user'),
            message: message
        };
        instance.post(`/rooms/${this.props.id}/messages`, payload)
            .then(response => {
                console.log(response);
                this.getMessages(this.props.id);
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderMessages = () => {
        const user = localStorage.getItem('user');
        const {messages, limit} = this.state;
        const len = messages.length;
        if (len <= limit) {
            this.setState({
                limit: len,
                canFetchMore: false,
            });
        }

        return (
            messages.slice(0, limit).map((message, index) =>
                <Animated animationIn="fadeIn" animationInDelay={50 * index} isVisible={true} key={index}>
                    <div className={message.username === user ? "ownMessage" : "message"}>
                        <div className={message.username === user ? "own-m-header" : "m-header"}>
                            <div className="username">{message.username}</div>
                            <div className="timestamp">
                                {moment(moment(message.createdOn).format('YYYYMMDDkkmmss'), 'YYYYMMDDkkmmss').fromNow()}
                            </div>
                        </div>
                        <div className="text">{message.message}</div>
                    </div>
                </Animated>
            )
        )

    }

    fetchMore = () => {

        if (!this.state.canFetchMore) {
            return
        }

        this.setState(prevState => {
            return ({
                ...prevState,
                limit: prevState.limit + 10,
            })
        })
    }

    componentDidMount() {
        this.getMessages(this.props.id);
        setInterval(() => this.getMessages(this.props.id), 2000);
    }

    render() {
        const {ready, canFetchMore} = this.state;

        return (
            <>
                {ready && canFetchMore && <div className={"fetch-more-btn"} onClick={this.fetchMore}>Do historie!</div>}
                <div className="messages">
                    {!ready && <Spinner/>}
                    {ready && this.renderMessages()}
                </div>
                <div className="message-sender">
                    {ready && <Input
                        placeholder={"Put the seat down when you're done"}
                        action={this.sendMessage}
                        style={{
                            textAlign: "left",
                        }}
                        sendingIcon={'✉'}
                    />}
                </div>
                <div ref={(el) => {
                    this.end = el
                }}/>
            </>
        )
    }
}
