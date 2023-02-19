import { formatMoney } from "@/config/formatMoney";
import Note from "@/layout/note/Note";
import { DataSelector } from "@/redux/selector/DataSelector";
import { UserSelector } from "@/redux/selector/UserSelector";
import { ChangeCardSuccess, LoadingDataUserSuccess } from "@/redux/slice/UserSlice";
import { ApiCardsPublic } from "data/api/cardsPublic";
import { ApiUsers } from "data/api/users";
import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function UserChangeCard(props) {
    const dispatch = useDispatch();
    //Data
    const Data = useSelector(DataSelector.Data);
    const Cards = Data?.Cards;
    const Prices = Data?.Prices;
    //User
    const User = useSelector(UserSelector.User);
    const accessToken = useSelector(UserSelector.AccessToken);

    const listCardsChange = Cards?.filter(item => item.change === true);

    //ChangeCard
    const [telco, setTelco] = useState("VIETTEL");
    const [code, setCode] = useState("");
    const [serial, setSerial] = useState("");
    const [idValue, setIdValue] = useState(1);

    const [listValueRender, setListValueRenders] = useState([]);

    useEffect(() => {
        const list = Prices?.filter(item => item.Card.telco === telco);
        setListValueRenders(list)
    }, [telco]);


    const handleChangeCard = async () => {
        if (code.length > 10 && serial.length > 10) {
            const idToast = toast.loading("Đang gửi thẻ...")
            await ApiCardsPublic.PostCards(telco, idValue, code, serial, User?.id, accessToken, dispatch, LoadingDataUserSuccess, ChangeCardSuccess, idToast);
            await ApiUsers.Data.LoadingDataUser(User?.id, dispatch, LoadingDataUserSuccess);
            setCode("");
            setSerial("");
        } else {
            toast.error("Mã thẻ - Serial không đúng định dạng!");
        }

    }
    return (
        <div id='change_card' className='bgr_white mt-3'>
            <div className='hearder_hag'>
                <h1>Đổi Thẻ</h1>
            </div>
            <Note />
            <Row>
                <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                    <div className='list_card'>
                        <Form.Select onChange={(e) => setTelco(e.target.value)}>
                            {
                                listCardsChange?.map((card, index) => {
                                    return (
                                        <option key={index} value={card.telco}>{card.telco}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </div>
                </Col>

                <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                    <div className='code_card'>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Code"
                                minLength={13}
                                maxLength={20}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </Col>

                <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                    <div className='serial_card'>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Serial"
                                minLength={13}
                                maxLength={20}
                                value={serial}
                                onChange={(e) => setSerial(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                </Col>

                <Col xs={12} sm={12} md={6} lg={3} xl={3} xxl={3}>
                    <div className='serial_card'>
                        <Form.Select onChange={(e) => setIdValue(e.target.value)}>
                            {
                                listValueRender?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.Value?.id}>{formatMoney(item.Value.name)}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </div>
                </Col>

                <Col xs={12}>
                    <div className='txt_center'>
                        <Button onClick={handleChangeCard} className='btn_send_card' variant='success' disabled={telco === "" || code === "" || serial === "" || idValue === ""}><i className="me-2 fa fa-upload"></i>Gửi thẻ</Button>
                    </div>
                </Col>
            </Row>
        </div >
    );
}

export default UserChangeCard;