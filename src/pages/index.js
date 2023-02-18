import UserChangeCard from '@/components/changeCard/ChangeCard';
import TablePrices from '@/components/tablePrices';
import CardsHot from '@/layout/cardHot';
import { DataSelector } from '@/redux/selector/DataSelector';
import { LoadingDataSuccess } from '@/redux/slice/DataSlice';
import { ApiUsers } from 'data/api/users';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function ChangeCard(props) {
  const dispatch = useDispatch();

  //Data
  const Data = useSelector(DataSelector.Data);
  const Cards = Data?.Cards;

  useEffect(() => {
    const LoadingData = async () => {
      await ApiUsers.Data.LoadingData(dispatch, LoadingDataSuccess)
    };
    LoadingData()
  }, []);


  return (
    <div id='home_page'>
      <Container>
        <div className='home_page_content'>
          <CardsHot />
          <UserChangeCard />
          {/* //TableChangeCarrd */}
          <TablePrices />

          <div className='buycard bgr_white mt-3'>
            <div className='buycard_content'>
              <div className='hearder_hag'>
                <h1>Mua Mã Thẻ Nhanh Chóng - Giá Rẻ</h1>
              </div>
              <div className='buycard_note p-3'>
                <p className='m-0 p-0'><i className="fa fa-angle-right me-2"></i>Nếu thẻ bị dạng chờ Xử lý, Quý khách hãy báo ở góc trái màn hình để admin hủy đơn cho bạn thực hiện lại!</p>
              </div>
              <div className='list_cards '>
                <Row>
                  {
                    Cards?.map((item, index) => {
                      return (
                        <Col key={index} xs={6} sm={6} md={4} lg={3} xl={2} xxl={2} >
                          <Card className='m-2'>
                            <Card.Img variant="top" src={item.Img?.path} />
                            <Card.Body>
                              <Card.Title>
                                <Link href={`/buycard/${item.telco.toLowerCase()}`}>Thẻ {item.telco}</Link>
                              </Card.Title>

                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>
            </div>
          </div>


        </div>
      </Container>
    </div>
  );
}

export default ChangeCard;