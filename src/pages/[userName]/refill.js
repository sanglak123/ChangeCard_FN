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
                                        <h1>Lưu Ý Nạp Quỹ</h1>
                                    </div>
                                    <ul>
                                        <li>
                                            - Nạp quỹ bằng tài khoản ngân hàng của bạn.Lợi dụng tính năng để RỬA TIỀN, NẠP XONG RÚT, KHÔNG NẠP CHÍNH CHỦ sẽ bị khóa vĩnh viễn, không hoàn số dư . Thời gian đợi thanh toán đối đa 15 phút.
                                        </li>
                                        <li>
                                            1. Chỉ cho phép Nạp tiền bằng ATM/MOMO của chính bạn để mua bán card, chuyển tiền, giao dịch hợp pháp
                                        </li>
                                        <li>
                                            2. Lấy ATM/MOMO của người khác nạp tiền vào web sẽ bị khóa vĩnh viễn, tịch thu tiền
                                        </li>
                                        <li>
                                            3. Nghiêm cấm nạp ATM xong rút Momo hoặc nạp Momo xong rút ATM
                                        </li>
                                        <li>
                                            4. Thời gian đợi thanh toán đối đa 15 phút. Hệ thống tự động cộng tiền 24/24. Vui lòng ghi đúng STK, nội dung chuyển khoản, Số tiền (sai sẽ bị phạt 20%)
                                        </li>
                                    </ul>
                                </div>
                                <div className='refill_main'>
                                    <div className='hearder_hag'>
                                        <h1>Tạo Phiếu Nạp Quỹ</h1>
                                    </div>
                                    <div className='refill_main_content'>
                                        <div className='refill_main_item'>
                                            <p>Số dư quỹ: <span className='text-success txt_bold'>{formatMoney(User.surplus)}</span></p>
                                            <p>Số dư quỹ khả dụng: <span className='text-success txt_bold'>{formatMoney(User.surplus)}</span></p>
                                        </div>
                                        <div className='refill_main_item'>
                                            <div className='b1'>
                                                <h6 className='txt_bold'>
                                                    <Form.Check
                                                        type={"radio"}
                                                        label={"Bước 1: Số tiền - Phương thức nạp"}
                                                        checked={amount > 9999 && idBankUser !== ""}
                                                    />
                                                </h6>

                                                <div className='b1_item'>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Số Tiền Nạp <span className='text-danger'>.000đ</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Số tiền nạp" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                        <Form.Text className="text-danger">
                                                            Tối thiểu 10,000 VNĐ - Tố đa 200,000,000 VNĐ (Chú ý lượt bỏ 3 số "0" sau cùng VD: Nạp :10,000đ {"=>"} Ghi: 10)
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Phương Thức Nạp</Form.Label>
                                                        <Form.Select onClick={(e) => setIdBankUser(e.target.value)}>
                                                            <option value={""}>Chon phương thức nạp</option>
                                                            {
                                                                BankOfUsers?.map((item, index) => {
                                                                    return (
                                                                        <option value={item.id} key={index}>{item.Bank?.name} - {item.number}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                        <Form.Text className="text-danger">
                                                            Tối thiểu 10,000 VNĐ - Tố đa 200,000,000 VNĐ
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
                                                            label={"Bước 2: Chọn ngân hàng nạp tiền"}
                                                            checked={step > 2}
                                                        />
                                                    </h6>

                                                    <div className='b2_item'>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Ngân hàng nạp tiền</Form.Label>
                                                            <Form.Select onChange={(e) => setIdBankPublic(e.target.value)}>
                                                                <option value={""}>Chon ngân hàng nạp</option>
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
                                                                label={"Bước 3: Tải hình ảnh xác minh"}
                                                                checked={photo !== ""}
                                                            />
                                                        </h6>

                                                        <div className='b3_item'>
                                                            <Form.Group className="mb-3">
                                                                <Form.Label>Chọn ảnh</Form.Label>
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
                                                        >Xác nhận</Button>
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
                                        <h1>Hạn Mức Và Mức Phí</h1>
                                    </div>
                                </div>
                                <div className='refill_limit'>
                                    <div className=''>
                                        <Table striped bordered hover size='sm' className='w-50'>
                                            <tbody>
                                                <tr>
                                                    <td>Tổng hạn mức ngày</td>
                                                    <td className='txt_bold'>Không hạn chế</td>
                                                </tr>
                                                <tr>
                                                    <td>Số tiền tối thiểu</td>
                                                    <td className='txt_bold'>10,000 đ</td>
                                                </tr>
                                                <tr>
                                                    <td>Số tiền tối đa</td>
                                                    <td className='txt_bold'>10,000,000 đ</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div>
                                        <Table striped bordered hover className='w-50'>
                                            <thead>
                                                <tr>
                                                    <th>Cổng Thanh Toán</th>
                                                    <th>Phí cố định</th>
                                                    <th>Phí</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Banks?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.name} - {item.sign}</td>
                                                                <td>0 đ</td>
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
                                                <h1>Lịch Sử Nạp</h1>
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