import { formatMoney } from '@/config/formatMoney';
import ErrorLogin from '@/layout/errorLogin/ErrorLogin';
import { UserSelector } from '@/redux/selector/UserSelector';
import React, { useState } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserTopUp(props) {
    const AccessToken = useSelector(UserSelector.AccessToken);
    const User = useSelector(UserSelector.User);

    const [numberTopup, setNumberTopup] = useState("");
    return (
        <div id='topup'>
            {
                AccessToken ?
                    <Container>
                        <div className='topup_content bgr_white'>
                            <div className='topup_item'>
                                <div className='topup_hearder'>
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
                                <div className='topup_main'>
                                    <div className='hearder_hag'>
                                        <h1>Tạo Phiếu Nạp Quỹ</h1>
                                    </div>
                                    <div className='topup_main_content'>
                                        <div className='topup_main_item'>
                                            <p>Số dư quỹ: <span className='text-success txt_bold'>{formatMoney(User.surplus)}</span></p>
                                            <p>Số dư quỹ khả dụng: <span className='text-success txt_bold'>{formatMoney(User.surplus)}</span></p>
                                        </div>
                                        <div className='topup_main_item'>
                                            <InputGroup className="mb-3">                                               
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control
                                                    aria-label="Amount (to the nearest dollar)"
                                                    value={numberTopup}
                                                    onChange={(e) => setNumberTopup(e.target.value)}
                                                />
                                                <InputGroup.Text>.000 VNĐ</InputGroup.Text>
                                            </InputGroup>
                                        </div>

                                        <div className='topup_main_item'>
                                            <InputGroup className="mb-3">                                               
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control
                                                    aria-label="Amount (to the nearest dollar)"
                                                    value={numberTopup}
                                                    onChange={(e) => setNumberTopup(e.target.value)}
                                                />
                                                <InputGroup.Text>.000 VNĐ</InputGroup.Text>
                                            </InputGroup>
                                        </div>
                                    </div>
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

export default UserTopUp;