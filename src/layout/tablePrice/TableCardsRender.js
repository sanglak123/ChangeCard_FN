import { formatMoney } from '@/config/formatMoney';
import { DataSelector } from '@/redux/selector/DataSelector';
import { LoadingDataSuccess } from '@/redux/slice/DataSlice';
import { ApiAdmin } from 'data/callApi/ApiAdmin';
import { ApiClients } from 'data/callApi/ApiClients';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function TableCardsRender({ telco }) {
    const dispatch = useDispatch();
    //Data
    const Data = useSelector(DataSelector.Data);
    const Prices = Data?.Prices;
    const [PriceRender, setPriceRender] = useState([]);

    useEffect(() => {
        const list = Prices.filter(item => item?.Card?.telco === telco);
        setPriceRender(list)
    }, [Data, telco])
    //Edit
    const [edit, setEdit] = useState("");
    const [feesBuy, setFeesBuy] = useState("");

    const handleEditFeesBuy = async (id) => {
        await ApiAdmin.Prices.EditFeesBuy(id, feesBuy);
        await ApiClients.Data.LoadingData(dispatch, LoadingDataSuccess)
        setEdit("")
    }

    return (
        <div id='table_cards_render'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='txt_white'>{telco}</th>
                        {
                            PriceRender?.map((price, index) => {
                                return (
                                    <th key={index} className='txt_white txt_center'>{formatMoney(price.Value.name)}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* //Post */}
                    <tr>
                        <th className='txt_white'>Post Card</th>
                        {
                            PriceRender?.map((price, index) => {
                                return (
                                    <th key={index} className='txt_white txt_center'>{price.feesChange} %</th>

                                )
                            })
                        }
                    </tr>
                    {/* //Buy */}
                    <tr>
                        <th className='txt_white'>Buy Card</th>
                        {
                            PriceRender?.map((price, index) => {
                                return (
                                    <th key={index} className='txt_white txt_center'>
                                        {
                                            edit === `${price.telco}_${price.Value?.name}` ?
                                                <InputGroup>
                                                    <Form.Control
                                                        type='number'
                                                        step={0.1}
                                                        min={1}
                                                        max={100}
                                                        placeholder="FeesBuy"
                                                        value={feesBuy}
                                                        onChange={(e) => setFeesBuy(e.target.value)}
                                                        className="txt_black txt_bold"
                                                        autoFocus
                                                    />
                                                    <Button onClick={() => setEdit("")} variant='danger'><i className="fa fa-times"></i></Button>
                                                    <Button onClick={() => handleEditFeesBuy(price.id)} variant='success'><i className="fa fa-check"></i></Button>
                                                </InputGroup>
                                                :
                                                <div className='feesBuy'>
                                                    <p> {price.feesBuy} %</p>
                                                    <i onClick={() => {
                                                        setEdit(`${price.telco}_${price.Value?.name}`);
                                                        setFeesBuy(price.feesBuy)
                                                    }} className="fa fa-cog"></i>
                                                </div>
                                        }

                                    </th>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default TableCardsRender;