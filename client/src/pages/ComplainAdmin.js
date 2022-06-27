// import hook
import React, { useEffect, useState } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import components here
import {Container, Row, Col} from 'react-bootstrap'
import Contact from '../components/complain/Contact'

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    // code here
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000')
        loadContact()

        return () => {
            socket.disconnect()
        }
    }, [])

    const loadContact = () => {
        // emit event to load admin contact
        socket.emit("load customer contact")
    
        // listen event to get admin contact
        socket.on("customer contact", (data) => {
            // do whatever to the data sent from server

            const dataContact = data.map((item) =>{
                return {
                    ...item,
                    message: 'Click here to start message'
                }
            })

            setContacts(dataContact)
        })
      }

      const onClickContact = (data) => {
        setContact(data)
      }

    return (
        <>
            <NavbarAdmin title={title} />
            <Container fluid style={{height: '90vh'}}>
                <Row>
                    <Col md={3}>
                        <Contact clickContact={onClickContact} dataContact={contacts} contact={contact}   />
                    </Col>
                </Row>
            </Container>
        </>
    )
}