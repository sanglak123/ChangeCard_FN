import { formatMoney } from '@/config/formatMoney';
import { UserSelector } from '@/redux/selector/UserSelector';
import { EditProfileSuccess } from '@/redux/slice/UserSlice';
import { ApiAdmins } from 'data/api/admins';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function DashboardProfile(props) {
    const Admin = useSelector(UserSelector.User);
    const dispatch = useDispatch();

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
        await ApiAdmins.Authen.EditProfile(Admin?.id, displayName, fullName, phone, adress, photo, email, dispatch, EditProfileSuccess);
        setEdit(false);
    }
    return (
        <div id='profile'>
            <div className='profile_content bgr_white mt-2'>

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
                    <p>Account : <span className='text-danger txt_bold'>{Admin?.admin === true ? "Admin" : "Client"}</span></p>
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
                                        <Form.Label>V?? ??i???n T???</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Your displayname"
                                            value={formatMoney(Admin?.surplus)}
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>S??? D?? Kh??? D???ng</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Your displayname"
                                            value={formatMoney(Admin?.surplus)}
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>T??n Hi???n Th???</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your displayname"
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    autoFocus
                                                />
                                                :
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your displayname"
                                                    value={Admin?.displayName ? Admin?.displayName : "Null"}
                                                    readOnly
                                                />


                                        }

                                    </Form.Group>
                                </Col>

                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>T??n ?????y ?????</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your full name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />

                                                :
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your full name"
                                                    value={Admin?.fullName ? Admin?.fullName : "Null"}
                                                    readOnly
                                                />

                                        }
                                    </Form.Group>

                                </Col>

                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>?????a Ch??? Email</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                :
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your email"
                                                    value={Admin?.email ? Admin?.email : "Null"}
                                                    readOnly
                                                />

                                        }

                                    </Form.Group>
                                </Col>

                                <Col xs={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>S??? ??I???n Tho???i</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your mobile number"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                :
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your email"
                                                    value={Admin?.phone ? Admin?.phone : "Null"}
                                                    readOnly
                                                />

                                        }

                                    </Form.Group>
                                </Col>

                                <Col xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>?????a Ch???</Form.Label>
                                        {
                                            edit ?
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your adress"
                                                    value={adress}
                                                    onChange={(e) => setAdress(e.target.value)}
                                                />
                                                :
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Your adress"
                                                    value={Admin?.adress ? Admin?.adress : "Null"}
                                                    readOnly
                                                />

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