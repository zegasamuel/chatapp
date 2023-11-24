import React, { useEffect, useState } from 'react'
import {
    Container,
    Row,
    Col,
    InputGroup,
    FormControl,
    Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { addMessage, loadMessagesBatch } from './redux/actions/messageActions'

const Chat = () => {
    const [newMessage, setNewMessage] = useState('')
    const messages = useSelector(state => state.messages.messages);
    const hasMoreMessages = useSelector(state => state.messages.hasMoreMessages);
    const dispatch = useDispatch()

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            dispatch(
                addMessage({
                    text: newMessage,
                    name: 'User 1',
                    imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/4/41/Profile-720.png',
                })
            )
            setNewMessage('')
        }
    }
    useEffect(() => {
        dispatch(loadMessagesBatch(25))
    }, [dispatch])
    const fetchMoreData = () => {
        dispatch(loadMessagesBatch(25))
    }
    return (
        <Container
            fluid
            className="px-0"
            style={{ height: '100vh', backgroundColor: '#E5E5E5' }}
        >
            <Row className="h-100 no-gutters">
                <Col
                    md={4}
                    className="mx-auto my-auto"
                    style={{ height: '90vh', backgroundColor: 'white' }}
                >
                    <div
                        className="chat-box"
                        style={{
                            height: '80vh',
                            overflowY: 'auto',
                            padding: '10px',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={messages.length}
                            next={fetchMoreData}
                            hasMore={hasMoreMessages}
                            loader={<h4>Loading...</h4>}
                            inverse={true} // To load at top scroll
                            scrollableTarget="chat-box"
                        >
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`d-flex mb-2 ${
                                        message.name === 'User 1'
                                            ? 'justify-content-end'
                                            : 'justify-content-start'
                                    }`}
                                >
                                    {message.name !== 'User 1' && (
                                        <img
                                            src={message.imageUrl}
                                            alt="User"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                marginRight: '10px',
                                            }}
                                        />
                                    )}
                                    <div>
                                        <p
                                            className="mb-1"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {message.name}
                                        </p>
                                        <div
                                            style={{
                                                background: '#F4F6F9',
                                                padding: '10px',
                                                borderRadius: '15px',
                                            }}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                    {message.name === 'User 1' && (
                                        <img
                                            src={message.imageUrl}
                                            alt="User"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                marginLeft: '10px',
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                    <InputGroup>
                        <FormControl
                            placeholder="Type a message..."
                            aria-label="Type a message..."
                            aria-describedby="basic-addon2"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(event) =>
                                event.key === 'Enter' && sendMessage()
                            }
                            style={{
                                borderRadius: '20px 0 0 20px',
                                padding: '10px 15px',
                            }}
                        />
                        <Button
                            variant="primary"
                            onClick={sendMessage}
                            style={{
                                borderRadius: '0 20px 20px 0',
                                padding: '10px 15px',
                            }}
                        >
                            Send
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default Chat
