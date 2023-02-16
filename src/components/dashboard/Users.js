import { formatMoney } from '@/config/formatMoney';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ModalViewsUser from '../modal/ViewsUser';

function DashboardUsers(props) {
    const Data = useSelector(AdminSelector.Data);
    const Users = Data?.Users;
    const limit = 12;

    const [page, setPage] = useState(1);
    const handlePreview = () => {
        if (page > 1) {
            setPage((pre) => pre - 1)
        }
    };
    const handleNext = () => {
        const count = Users?.length;
        if (page < count / limit) {
            setPage(prev => prev + 1)
        }
    };

    const [userRender, setUserRender] = useState([]);
    useEffect(() => {
        const offset = (page - 1) * limit;
        const render = Users.slice(offset, (offset + limit));
        setUserRender(render);
    }, [page]);

    //Views User
    const [show, setShow] = useState(false);
    const [userShow, setUserShow] = useState("");
    const handleViewsUser = async (user) => {
        setShow(true);
        setUserShow(user);
    }

    return (
        <div id='users' className='layout_wrapter'>
            <div className='hearder_hag'>
                <h1>List Users</h1>
            </div>
            <div className='table_list_users'>
                <Table bordered size="sm">
                    <thead>
                        <tr className='txt_white txt_center'>
                            <th>#</th>
                            <th>DisplayName</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Surplus</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userRender?.map((user, index) => {
                                return (
                                    <tr key={index} className='txt_white txt_center'>
                                        <td>{index + 1}</td>
                                        <td>{user?.displayName}</td>
                                        <td className='txt_bold'>{user?.userName}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.phone}</td>
                                        <td>{formatMoney(user?.surplus)}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button variant='primary'>RePass</Button>
                                                <Button onClick={() => handleViewsUser(user)} variant='success'>Views</Button>
                                                <Button variant='danger'>Lock</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <ModalViewsUser
                show={show}
                setShow={setShow}
                user={userShow}
            />
            <div className='pagination'>
                <ButtonGroup>
                    <Button onClick={handlePreview}>Prev</Button>
                    <Button className='txt_bold' disabled variant='danger'>Trang: {page}</Button>
                    <Button onClick={handleNext}>Next</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default DashboardUsers;