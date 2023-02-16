import { AdminSelector } from '@/redux/selector/AdminSelector';
import { EditProfileSuccess } from '@/redux/slice/AdminSlice';
import { ApiAdmin } from 'data/callApi/ApiAdmin';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function DashboardProfile(props) {
    const Admin = useSelector(AdminSelector.Admin);
    const dispatch = useDispatch();
    console.log(Admin)

    //Edit  
    const [photo, setPhoto] = useState("");
    const [preview, setPreview] = useState("");

    const [fullName, setFullName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const [edit, setEdit] = useState(false);

    //Edit
    const handleEditProfile = async () => {
        await ApiAdmin.Authen.EditProfile(Admin?.id, displayName, fullName, phone, adress, photo, email, dispatch, EditProfileSuccess);
        setEdit(false);
    }
    return (
        <div id='profile'>
            <div className='profile_content layout_wrapter'>

                <div className='profile_avatr'>
                    <div className='hearder_hag'>
                        <h1>Profile <span className='text-danger'>{Admin?.userName.toUpperCase()}</span></h1>
                    </div>
                    {
                        edit ?
                            <>
                                <div className='avatar'>
                                    {
                                        preview !== "" ?
                                            <img src={preview} alt={`preview_${Admin?.userName}`} className='img-fluid' />
                                            :
                                            <img src={Admin?.Img?.path} alt={Admin?.userName} className='img-fluid' />
                                    }

                                </div>
                                <InputGroup>
                                    <Form.Control
                                        type='file'
                                        onChange={(e) => onImageChange(e)}
                                    />
                                </InputGroup>
                            </>

                            :
                            <div className='avatar'>
                                <img src={Admin?.Img?.path} alt={Admin?.userName} className='img-fluid' />
                            </div>
                    }

                    <p>User : <span className='text-danger txt_bold'>{Admin?.userName}</span></p>
                </div>
                <div className='Profile_setting'>
                    <div className='hearder_hag'>
                        <h1>Profile Setting</h1>
                    </div>
                    <div className='profile_content'>
                        <div className='profile_item'>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Display Name :</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your displayname"
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    className='txt_bold txt_black'
                                                />
                                                :
                                                <p>{Admin?.displayName ? Admin?.displayName : "Null"}</p>

                                        }

                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your full name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className='txt_bold txt_black'
                                                />

                                                :
                                                <p>{Admin?.fullName ? Admin?.fullName : "Null"}</p>
                                        }
                                    </Form.Group>

                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Email</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                :
                                                <p>{Admin?.email ? Admin?.email : "Null"}</p>
                                        }

                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mobile number</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your mobile number"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                :
                                                <p>{Admin?.phone ? Admin?.phone : "Null"}</p>
                                        }

                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Adress</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your adress"
                                                    value={adress}
                                                    onChange={(e) => setAdress(e.target.value)}
                                                />
                                                :
                                                <p>{Admin?.adress ? Admin?.adress : "Null"}</p>
                                        }

                                    </Form.Group>
                                </Col>
                            </Row>

                        </div>
                    </div>
                </div>
            </div>
            <div className='profile_btn'>
                {
                    edit ?
                        <>

                            <Button className='me-3' onClick={() => {
                                setEdit(false);
                                setAdress("");
                                setDisplayName("");
                                setEmail("");
                                setPhone("");
                                setPhoto("");
                                setPreview("")
                            }} variant='danger'>Cancle</Button>

                            <Button disabled={displayName === "" || fullName === "" || phone === "" || adress === ""} onClick={() => handleEditProfile()} variant='success'>Save</Button>
                        </>

                        :
                        <Button onClick={() => {
                            setEdit(true);
                            setAdress(Admin?.adress);
                            setDisplayName(Admin?.displayName);
                            setFullName(Admin?.fullName)
                            setEmail(Admin?.email);
                            setPhone(Admin?.phone);
                        }} variant='success'>Edit</Button>
                }

            </div>
        </div>
    );
}

export default DashboardProfile;