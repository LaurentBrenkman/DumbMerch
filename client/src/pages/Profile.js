import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import dateFormat from 'dateformat';
import convertRupiah from 'rupiah-format';
import { useQuery } from 'react-query';

import Navbar from '../components/Navbar';

import imgDumbMerch from '../assets/DumbMerch.png';

import { UserContext } from '../context/userContext';

import imgBlank from '../assets/blank-profile.png';

import { API } from '../config/api';
import { Link } from 'react-router-dom';

export default function Profile() {
  const title = 'Profile';
  document.title = 'DumbMerch | ' + title;

  const [state] = useContext(UserContext);

  // const [transactions, setTransactions] = useState([]);

  let { data: profile } = useQuery('profileCache', async () => {
    const response = await API.get('/profile/' + state.user.id);
    console.log(response.data.data)
    return response.data.data;
  });

  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    return response.data.data;
  });

  console.log(state.user)

  // memanggil Link gambar di folder uploads
  const imgLink = 'http://localhost:5000/uploads/'

  return (
    <>
      <Navbar title={title} />
      <Container className="my-5">
        <Row>
          <Col md="6">
            <div className="text-header-product mb-4">My Profile</div>
            <Row>
              <Col md="6">
                <img
                  src={profile?.image ? imgLink + profile.image : imgBlank}
                  className="img-fluid rounded mb-4"
                  alt="avatar"
                />
                {/* melakukan link + memunculkan id user */}
                <Link to={"/edit-profile/" + state.user.id} className='bg-success text-decoration-none text-white p-2 mt-3' >
                  Edit Profile
                </Link>
              </Col>
              <Col md="6">
                <div className="profile-header">Name</div>
                <div className="profile-content">{state.user.name}</div>

                <div className="profile-header">Email</div>
                <div className="profile-content">{state.user.email}</div>

                <div className="profile-header">Phone</div>
                <div className="profile-content">
                  {profile?.phone ? profile?.phone : '-'}
                </div>

                <div className="profile-header">Gender</div>
                <div className="profile-content">
                  {profile?.gender ? profile?.gender : '-'}
                </div>

                <div className="profile-header">Address</div>
                <div className="profile-content">
                  {profile?.address ? profile?.address : '-'}
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div className="text-header-product mb-4">My Transaction</div>
            {transactions?.length !== 0 ? (
              <>
                {transactions?.map((item, index) => (
                  <div
                    key={index}
                    style={{ background: '#303030' }}
                    className="p-2 mb-1"
                  >
                    <Container fluid className="px-1">
                      <Row>
                        <Col xs="3">
                          <img
                            src={item.product.image}
                            alt="img"
                            className="img-fluid"
                            style={{
                              height: '120px',
                              width: '170px',
                              objectFit: 'cover',
                            }}
                          />
                        </Col>
                        <Col xs="6">
                          <div
                            style={{
                              fontSize: '18px',
                              color: '#F74D4D',
                              fontWeight: '500',
                              lineHeight: '19px',
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            className="mt-2"
                            style={{
                              fontSize: '14px',
                              color: '#F74D4D',
                              fontWeight: '300',
                              lineHeight: '19px',
                            }}
                          >
                            {dateFormat(item.createdAt, 'dddd, d mmmm yyyy')}
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              fontSize: '14px',
                              fontWeight: '300',
                            }}
                          >
                            Price : {convertRupiah.convert(item.price)}
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              fontSize: '14px',
                              fontWeight: '700',
                            }}
                          >
                            Sub Total : {convertRupiah.convert(item.price)}
                          </div>
                        </Col>
                        <Col xs="3">
                          <img
                            src={imgDumbMerch}
                            alt="img"
                            className="img-fluid"
                            style={{ maxHeight: '120px' }}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-data-transaction">No transaction</div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
