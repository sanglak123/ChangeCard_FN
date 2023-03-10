import { formatMoney } from '@/config/formatMoney';
import ErrorLogin from '@/layout/errorLogin/ErrorLogin';
import { DataSelector } from '@/redux/selector/DataSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { ApiUsers } from 'data/api/users';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, ListGroup, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserRefill(props) {
    //Data  
    const Banks = useSelector(DataSelector.Banks);
    const BankPublics = useSelector(DataSelector.ReceiveBanks);

    //DataUser
    const Payments = useSelector(UserSelector.Payments);

    //User
    const AccessToken = useSelector(UserSelector.AccessToken);
    const User = useSelector(UserSelector.User);
    const BankOfUsers = useSelector(UserSelector.BankOfUsers);
    console.log(BankOfUsers)

    const [amount, setAmount] = useState("");
    const [idBankUser, setIdBankUser] = useState("");
    const [idBankPublic, setIdBankPublic] = useState("");
    const [photo, setPhoto] = useState("");

    //Step
    const [step, setStep] = useState(1)
    useEffect(() => {
        if (amount > 9.9999 && idBankUser !== "") {
            setStep(2)
        } else {
            setStep(1);
            setPhoto("");
            setIdBankPublic("")
        }
    }, [amount, idBankUser])

    useEffect(() => {
        if (amount !== "" && idBankPublic !== "") {
            setStep(3)
        } else {
            setPhoto("")
        }
    }, [amount, idBankPublic])

    const hadleCreateRefill = async () => {
        await ApiUsers.Refill.Create(User?.id, amount, idBankUser, idBankPublic, photo, AccessToken);
    }
    return (
        <div id='topup'>
            {
                AccessToken ?
                    <Container>
                        <div className='refill_content bgr_white'>
                            <div className='refill_item'>
                                <div className='refill_hearder'>
                                    <div className='hearder_hag'>
                                        <h1>L??u ?? N???p Qu???</h1>
                                    </div>
                                    <ul>
                                        <li>
                                            - N???p qu??? b???ng t??i kho???n ng??n h??ng c???a b???n.L???i d???ng t??nh n??ng ????? R???A TI???N, N???P XONG R??T, KH??NG N???P CH??NH CH??? s??? b??? kh??a v??nh vi???n, kh??ng ho??n s??? d?? . Th???i gian ?????i thanh to??n ?????i ??a 15 ph??t.
                                        </li>
                                        <li>
                                            1. Ch??? cho ph??p N???p ti???n b???ng ATM/MOMO c???a ch??nh b???n ????? mua b??n card, chuy???n ti???n, giao d???ch h???p ph??p
                                        </li>
                                        <li>
                                            2. L???y ATM/MOMO c???a ng?????i kh??c n???p ti???n v??o web s??? b??? kh??a v??nh vi???n, t???ch thu ti???n
                                        </li>
                                        <li>
                                            3. Nghi??m c???m n???p ATM xong r??t Momo ho???c n???p Momo xong r??t ATM
                                        </li>
                                        <li>
                                            4. Th???i gian ?????i thanh to??n ?????i ??a 15 ph??t. H??? th???ng t??? ?????ng c???ng ti???n 24/24. Vui l??ng ghi ????ng STK, n???i dung chuy???n kho???n, S??? ti???n (sai s??? b??? ph???t 20%)
                                        </li>
                                    </ul>
                                </div>
                                <div className='refill_main'>
                                    <div className='hearder_hag'>
                                        <h1>T???o Phi???u N???p Qu???</h1>
                                    </div>
                                    <div className='refill_main_content'>
                                        <div className='refill_main_item'>
                                            <p>S??? d?? qu???: <span className='text-success txt_bold'>{formatMoney(User.surplus)}</span></p>
                                            <p>S??? d?? qu??? kh??? d???ng: <span className='text-success txt_bold'>{formatMoney(User.surplus)}</span></p>
                                        </div>
                                        <div className='refill_main_item'>
                                            <div className='b1'>
                                                <h6 className='txt_bold'>
                                                    <Form.Check
                                                        type={"radio"}
                                                        label={"B?????c 1: S??? ti???n - Ph????ng th???c n???p"}
                                                        checked={amount > 9999 && idBankUser !== ""}
                                                    />
                                                </h6>

                                                <div className='b1_item'>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>S??? Ti???n N???p <span className='text-danger'>.000??</span></Form.Label>
                                                        <Form.Control type="text" placeholder="S??? ti???n n???p" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                        <Form.Text className="text-danger">
                                                            T???i thi???u 10,000 VN?? - T??? ??a 200,000,000 VN?? (Ch?? ?? l?????t b??? 3 s??? "0" sau c??ng VD: N???p :10,000?? {"=>"} Ghi: 10)
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Ph????ng Th???c N???p</Form.Label>
                                                        <Form.Select onClick={(e) => setIdBankUser(e.target.value)}>
                                                            <option value={""}>Chon ph????ng th???c n???p</option>
                                                            {
                                                                BankOfUsers?.map((item, index) => {
                                                                    return (
                                                                        <option value={item.id} key={index}>{item.Bank?.name} - {item.number}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                        <Form.Text className="text-danger">
                                                            T???i thi???u 10,000 VN?? - T??? ??a 200,000,000 VN??
                                                        </Form.Text>
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            {
                                                step > 1 &&
                                                <div className='b2'>
                                                    <h6 className='txt_bold'>
                                                        <Form.Check
                                                            type={"radio"}
                                                            label={"B?????c 2: Ch???n ng??n h??ng n???p ti???n"}
                                                            checked={step > 2}
                                                        />
                                                    </h6>

                                                    <div className='b2_item'>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Ng??n h??ng n???p ti???n</Form.Label>
                                                            <Form.Select onChange={(e) => setIdBankPublic(e.target.value)}>
                                                                <option value={""}>Chon ng??n h??ng n???p</option>
                                                                {
                                                                    BankPublics?.map((item, index) => {
                                                                        return (
                                                                            <option value={item.id} key={index}>{item.Bank?.name} - {item.number}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                step > 2 &&
                                                <>

                                                    <div className='b3'>
                                                        <h6 className='txt_bold'>
                                                            <Form.Check
                                                                type={"radio"}
                                                                label={"B?????c 3: T???i h??nh ???nh x??c minh"}
                                                                checked={photo !== ""}
                                                            />
                                                        </h6>

                                                        <div className='b3_item'>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Ch???n ???nh</Form.Label>
                                                                <Form.Control type='file' onChange={(e) => setPhoto(e.target.files[0])} />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            disabled={
                                                                amount < 10 || idBankPublic === "" || photo === ""
                                                            }
                                                            onClick={hadleCreateRefill}
                                                        >X??c nh???n</Button>
                                                    </div>
                                                </>
                                            }
                                        </div>


                                        <div className='admin_payment'>

                                        </div>
                                    </div>
                                </div>
                                <div className='refill_bot'>
                                    <div className='hearder_hag'>
                                        <h1>H???n M???c V?? M???c Ph??</h1>
                                    </div>
                                </div>
                                <div className='refill_limit'>
                                    <div className=''>
                                        <Table striped bordered hover size='sm' className='w-50'>
                                            <tbody>
                                                <tr>
                                                    <td>T???ng h???n m???c ng??y</td>
                                                    <td className='txt_bold'>Kh??ng h???n ch???</td>
                                                </tr>
                                                <tr>
                                                    <td>S??? ti???n t???i thi???u</td>
                                                    <td className='txt_bold'>10,000 ??</td>
                                                </tr>
                                                <tr>
                                                    <td>S??? ti???n t???i ??a</td>
                                                    <td className='txt_bold'>10,000,000 ??</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div>
                                        <Table striped bordered hover className='w-50'>
                                            <thead>
                                                <tr>
                                                    <th>C???ng Thanh To??n</th>
                                                    <th>Ph?? c??? ?????nh</th>
                                                    <th>Ph??</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Banks?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.name} - {item.sign}</td>
                                                                <td>0 ??</td>
                                                                <td>0 %</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                <div className='refill_history'>
                                    {
                                        Payments.length > 0 &&
                                        <div className='refill_history_content'>
                                            <div className='hearder_hag'>
                                                <h1>L???ch S??? N???p</h1>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Container>

                    :
                    <ErrorLogin />
            }

        </div>
    );
}

export default UserRefill;