import { DataSelector } from '@/redux/selector/DataSelector';
import { LoadingDataSuccess } from '@/redux/slice/DataSlice';
import { ApiAdmin } from 'data/callApi/ApiAdmin';
import { ApiClients } from 'data/callApi/ApiClients';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ModalShowImage from '../modal/ShowImageCards';

function Cards(props) {

    const dispatch = useDispatch();
    //Data
    const Data = useSelector(DataSelector.Data);
    const Cards = Data?.Cards;
    console.log(Cards)

    //List Card
    const limit = 10;
    const [pageCard, setPageCard] = useState(1);
    const [ListCard, setListCard] = useState([]);

    const handlePrevPageCards = () => {
        if (pageCard > 1) {
            setPageCard(prev => prev - 1)
        }
    };
    const handleNextPageCards = () => {
        const count = Cards?.length;
        if (pageCard < count / limit) {
            setPageCard(prev => prev + 1)
        }
    };

    useEffect(() => {
        const offset = (pageCard - 1) * limit;
        const lits = Cards.slice(offset, (offset + limit));
        setListCard(lits);
    }, [Cards, pageCard]);

    //Edit
    const [edit, setEdit] = useState("");
    const [telco, setTelco] = useState("");
    const [photo, setPhoto] = useState("");
    const [change, setChange] = useState(false);

    const handleEditCard = async (card) => {
        await ApiAdmin.Cards.Edit(card.id, telco, photo, change);
        await ApiClients.Data.LoadingData(dispatch, LoadingDataSuccess);
        setEdit("")
    };
    //Delete
    const handleDeleteCard = async (card) => {
        await ApiAdmin.Cards.Delete(card.id);
        await ApiClients.Data.LoadingData(dispatch, LoadingDataSuccess);

    };

    return (
        <div id='List_Cards'>
            <div className='table_card_list layout_wrapter'>
                <div className='hearder_hag'>
                    <h1>Cards List</h1>
                </div>
                <div className='table_card'>
                    <Table bordered size="sm">
                        <thead>
                            <tr className='txt_white txt_center'>
                                <th>#</th>
                                <th>Telco</th>
                                <th>Logo</th>
                                <th>Type</th>
                                <th>Change</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ListCard?.map((item, index) => {
                                    return (
                                        <tr className='txt_white txt_bold txt_center' key={index}>
                                            <td>{index + 1}</td>
                                            {
                                                edit === `${item.telco}_${item.id}` ?
                                                    <>
                                                        <td>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    placeholder="Telco"
                                                                    aria-label="Telco"
                                                                    aria-describedby="basic-telco"
                                                                    className='txt_bold'
                                                                    autoFocus
                                                                    value={telco}
                                                                    onChange={(e) => setTelco(e.target.value)}
                                                                />
                                                            </InputGroup>
                                                        </td>
                                                        <td>  <InputGroup className="mb-3">
                                                            <Form.Control
                                                                type='file'
                                                                onChange={(e) => setPhoto(e.target.files[0])}
                                                                className='txt_bold'
                                                            />
                                                        </InputGroup>
                                                        </td>
                                                        <td>{item.TypeCard.name}</td>
                                                        <td>
                                                            <Form.Check
                                                                type={"switch"}     
                                                                checked={change}                                                   
                                                                onChange={() => setChange(!change)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <ButtonGroup>
                                                                <Button onClick={() => handleEditCard(item)} variant='success'>Save</Button>
                                                                <Button onClick={() => {
                                                                    setEdit("");
                                                                    setTelco("");
                                                                    setPhoto("");
                                                                }} variant='danger'>Cancle</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </>
                                                    :
                                                    <>
                                                        <td>{item.telco}</td>
                                                        <td>
                                                            <div className='logo' style={{ maxWidth: "100px", margin: "0 auto" }}>
                                                                <img src={item.Img?.path} alt={item.telco} className="img-fluid" />
                                                            </div>
                                                        </td>
                                                        <td>{item.TypeCard.name}</td>
                                                        <td>
                                                            <Form.Check
                                                                type={"switch"}
                                                                checked={item.change}
                                                            />
                                                        </td>

                                                        <td>
                                                            <ButtonGroup>
                                                                <Button onClick={() => {
                                                                    setEdit(`${item.telco}_${item.id}`);
                                                                    setTelco(item.telco);
                                                                    setChange(item.change)
                                                                }} variant='success'>Edit</Button>
                                                                <Button onClick={() => handleDeleteCard(item)} variant='danger'>Delete</Button>
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
                    <ButtonGroup>
                        <Button variant='success' onClick={handlePrevPageCards}>Prev</Button>
                        <Button variant='danger' disabled>Trang : {pageCard}</Button>
                        <Button variant='success' onClick={handleNextPageCards}>Next</Button>
                    </ButtonGroup>
                </div>
            </div>
            <Button variant='outline-danger' className='btn_add_card txt_bold'>+</Button>
        </div>
    );
}

export default Cards;