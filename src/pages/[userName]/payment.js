import ErrorLogin from '@/layout/errorLogin/ErrorLogin';
import { DataSelector } from '@/redux/selector/DataSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { AddBankOfUserSuccess, LoadingDataUserSuccess } from '@/redux/slice/UserSlice';
import { ApiUsers } from 'data/api/users';
import { UserPaymentsApi } from 'data/api/users/payments';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function UserPayments(props) {
    const dispatch = useDispatch();
    //Data  
    const Banks = useSelector(DataSelector.Banks);
    const User = useSelector(UserSelector.User);

    const AccessToken = useSelector(UserSelector.AccessToken);
    const [idBank, setIdBank] = useState("");
    const [number, setNumber] = useState("");
    const [owner, setOwner] = useState("");
    const [branch, setBranch] = useState("");

    //GetBankOfUser
    useEffect(() => {
        const GetBankOfUser = async () => {
            await ApiUsers.Data.LoadingDataUser(User?.id, dispatch, LoadingDataUserSuccess)
        };
        GetBankOfUser();
    }, [User])
    const BankOfUsers = useSelector(UserSelector.BankOfUsers);

    //Add
    const handleAddBankOfUser = async () => {
        await UserPaymentsApi.BankOfUser.Add(idBank, number, owner, branch, User?.id, dispatch, AddBankOfUserSuccess, AccessToken);
       setIdBank("")
        setBranch("");
        setNumber("");
        setOwner("");
    };

    //Edit
    const [edit, setEdit] = useState("");
    const handleEditBankOfUser = async (bank) => {
        await ApiUsers.BankOfUser.Edit(bank.id, number, owner, branch, User.id);
        await ApiUsers.Data.LoadingDataUser(User?.id, dispatch, LoadingDataUserSuccess);
        setEdit("");
    };

    //Add
    const handleDeleteBankOfUser = async (bank) => {
        await ApiUsers.BankOfUser.Delete(bank.id, User.id);
        await ApiUsers.Data.LoadingDataUser(User?.id, dispatch, LoadingDataUserSuccess);
    };
    return (
        AccessToken ?
            <div id='user_payments'>
                <Container>
                    <div className='user_payments_content bgr_white'>

                        <div className='user_payments_items'>
                            <div className='hearder_hag'>
                                <h1>T??i Kho???n Ng??n H??ng</h1>
                            </div>
                            <div className='table_user_payments'>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr className='txt_center'>
                                            <th>#</th>
                                            <th>T??n Ng??n H??ng</th>
                                            <th>M?? Ng??n H??ng</th>
                                            <th>S??? t??i kho???n</th>
                                            <th>Ch??? t??i kho???n</th>
                                            <th>Chi nh??nh</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            BankOfUsers?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.Bank?.name}</td>
                                                        <td>{item?.Bank?.sign}</td>
                                                        {
                                                            edit === `${item?.Bank?.id}_${item?.owner}` ?
                                                                <>

                                                                    <td>
                                                                        <InputGroup>
                                                                            <Form.Control
                                                                                type={"text"}
                                                                                placeholder='S??? t??i kho???n'
                                                                                value={number}
                                                                                onChange={(e) => setNumber(e.target.value)}
                                                                            />
                                                                        </InputGroup>
                                                                    </td>
                                                                    <td><InputGroup>
                                                                        <Form.Control
                                                                            type={"text"}
                                                                            placeholder='Ch??? t??i kho???n'
                                                                            value={owner}
                                                                            onChange={(e) => setOwner(e.target.value)}
                                                                        />
                                                                    </InputGroup></td>
                                                                    <td>
                                                                        <InputGroup>
                                                                            <Form.Control
                                                                                type={"text"}
                                                                                placeholder='Chi Nh??nh'
                                                                                value={branch}
                                                                                onChange={(e) => setBranch(e.target.value)}
                                                                            />
                                                                        </InputGroup>
                                                                    </td>
                                                                    <td>
                                                                        <ButtonGroup>
                                                                            <Button onClick={() => handleEditBankOfUser(item)} variant='success'>Save</Button>
                                                                            <Button onClick={() => {
                                                                                setEdit("");
                                                                                setNumber("");
                                                                                setOwner("");
                                                                                setBranch("")
                                                                            }} variant='danger'>Cancle</Button>
                                                                        </ButtonGroup>
                                                                    </td>
                                                                </>
                                                                :
                                                                <>
                                                                    <td>{item?.number}</td>
                                                                    <td>{item?.owner}</td>
                                                                    <td>{item?.branch}</td>
                                                                    <td>
                                                                        <ButtonGroup>
                                                                            <Button onClick={() => {
                                                                                setEdit(`${item.Bank.id}_${item.owner}`);
                                                                                setNumber(item.number);
                                                                                setOwner(item.owner);
                                                                                setBranch(item.branch)
                                                                            }} variant='success'>Edit</Button>
                                                                            <Button onClick={() => handleDeleteBankOfUser(item)} variant='danger'>Delete</Button>
                                                                        </ButtonGroup>
                                                                    </td>
                                                                </>
                                                        }

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        <div className='user_payments_items'>
                            <div className='hearder_hag'>
                                <h1>Th??m M???i Ng??n H??ng</h1>
                            </div>
                            <div className='add_banks'>
                                <Form.Select onChange={(e) => setIdBank(e.target.value)}>
                                    <option value={""}>- Ch???n Ng??n H??ng -</option>
                                    {
                                        Banks?.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{`${item.name} (${item.sign})`}</option>
                                            )
                                        })
                                    }

                                </Form.Select>

                                <InputGroup className="mt-3">
                                    <InputGroup.Text id="basic-addon1"><i className="fa fa-id-card"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="S??? t??i kho???n"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mt-3">
                                    <InputGroup.Text id="basic-addon1"><i className="fa fa-user-shield"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Ch??? t??i kho???n"
                                        value={owner}
                                        onChange={(e) => setOwner(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="mt-3">
                                    <InputGroup.Text id="basic-addon1"><i className="fa fa-code-branch"></i></InputGroup.Text>
                                    <Form.Control
                                        placeholder="Chi nh??nh"
                                        value={branch}
                                        onChange={(e) => setBranch(e.target.value)}
                                    />
                                </InputGroup>
                                <div className='mt-3'>
                                    <Button disabled={idBank === "" || number === "" || owner === "" || branch === ""} onClick={() => handleAddBankOfUser()}>Th??m</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>


            </div>
            :
            <ErrorLogin />
    );
}

export default UserPayments;