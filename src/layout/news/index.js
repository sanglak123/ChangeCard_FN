import { formatMoney } from '@/config/formatMoney';
import { DataSelector } from '@/redux/selector/DataSelector';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function News(props) {
    //Data
    const Data = useSelector(DataSelector.Data);
    const Products = Data?.Products;
  
    return (
        <div id='news'>
            <div className='news_content'>
                <div id="scroll-container">
                    <div id="scroll-text" className='d-flex'>
                        {
                            Products?.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <span className='text-danger txt_bold'>{item.User.displayName? item.User.displayName: item.User.userName}</span>
                                        {` vừa ${item.command === "buy" ? "mua " : "đổi "} thẻ `}
                                        <span className='text-danger txt_bold'> {item.Price?.Card.telco} - {formatMoney(item.Price?.Value?.name)}</span>
                                        <span className='text-success txt_bold'> thành công.</span>
                                    </li>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;