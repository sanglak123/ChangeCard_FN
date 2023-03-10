import { formatMoney } from '@/config/formatMoney';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import { UserSelector } from '@/redux/selector/UserSelector';
import { LogoutAdminSuccess } from '@/redux/slice/AdminSlice';
import { LogoutUserSuccess } from '@/redux/slice/UserSlice';
import { ApiUsers } from 'data/api/users';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import News from '../news';

function Hearder(props) {
    //LoginAdmin?
    const LoginAdmin = useSelector(AdminSelector.LoginAdmin);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = router.pathname;
    const route = router.route;
    const User = useSelector(UserSelector.User);
    const AccessToken = useSelector(UserSelector.AccessToken)
    const Store = useSelector(UserSelector.Store);

    const handleLogout = async () => {
        if (User?.admin) {
            await ApiUsers.Authen.Logout(dispatch, LogoutUserSuccess, router);
            dispatch(LogoutAdminSuccess())
        } else {
            await ApiUsers.Authen.Logout(dispatch, LogoutUserSuccess, router);
        }
    }

    return (
        pathname !== "/login" && pathname !== "/admin/dashboard" && pathname !== "/admin" &&
        <>
            <div id='hearder'>
                <div className='container'>
                    <Navbar expand="lg">
                        <Container>
                            <Navbar.Brand className='link_logo' href="/">
                                <div className='logo'>
                                    <h1>DOITHE247</h1>
                                    <span>www.doithe247.hag.com.vn</span>
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link className={route === "/changecard" ? "active me-3" : "me-3"} href="/changecard">?????i Th???</Nav.Link>
                                    <Nav.Link className={route === "/buycard/[telco]" ? "active me-3" : "me-3"} href="/buycard/viettel">Mua Th???</Nav.Link>
                                    <Nav.Link className={route === "/[userName]/refill" ? "active me-3" : "me-3"} href={`/${User?.userName}/refill`}>N???p Ti???n</Nav.Link>
                                    <Nav.Link className={route === "/[userName]/withdraw" ? "active me-3" : "me-3"} href={`/${User?.userName}/withdraw`}>R??t Ti???n</Nav.Link>
                                    <Nav.Link className={route === "/connectapi" ? "active me-3" : "me-3"} href="/connectapi">K???t N???i Api</Nav.Link>
                                    <Nav.Link className={route === "/usemanual" ? "active me-3" : "me-3"} href="/usemanual">H?????ng D???n</Nav.Link>
                                </Nav>
                                <Nav>
                                    {
                                        AccessToken ?
                                            <>
                                                <Nav.Link disabled className='nav_surlpus'><i className="fa fa-user"></i></Nav.Link>

                                                <NavDropdown title={User?.displayName ? User?.displayName : User?.userName} id="basic-nav-dropdown">
                                                    <NavDropdown.Item href={`/${User?.userName}/profile`}><i className="fa fa-user-cog me-2"></i>Th??ng tin t??i kho???n</NavDropdown.Item>

                                                    <NavDropdown.Item href={`/${User?.userName}/payment`}><i className="fa fa-donate me-2"></i>Qu??? s??? d??</NavDropdown.Item>
                                                    <NavDropdown.Item href={`/${User?.userName}/payment`}><i className="fa fa-dollar-sign me-2"></i>N???p ti???n</NavDropdown.Item>
                                                    <NavDropdown.Item href={`/${User?.userName}/payment`}><i className="fa fa-hand-holding-usd me-2"></i>R??t ti???n</NavDropdown.Item>
                                                    <NavDropdown.Item href={`/${User?.userName}/payment`}><i className="fa fa-university me-2"></i>T??i kho???n ng??n h??ng</NavDropdown.Item>
                                                    <NavDropdown.Item href={`/${User?.userName}/payment`}><i className="fa fa-exchange-alt me-2"></i>L???ch s??? ?????i th??? c??o</NavDropdown.Item>
                                                    <NavDropdown.Item href={`/${User?.userName}/payment`}><i className="fa fa-audio-description me-2"></i>L???ch s??? mua th??? c??o</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item href={`/${User?.userName}/payment`}><i className="fa fa-project-diagram me-2"></i>K???t n???i Api</NavDropdown.Item>
                                                    {
                                                        User?.admin &&
                                                        <NavDropdown.Item href={LoginAdmin ? "/admin/dashboard" : "/admin/auth/login"}><i className="fa fa-grip-horizontal me-2"></i>Dashboard</NavDropdown.Item>
                                                    }
                                                    <NavDropdown.Item onClick={() => handleLogout()}><i className="fa fa-sign-out-alt me-2"></i>Logout</NavDropdown.Item>

                                                </NavDropdown>
                                                <Nav.Link disabled className='nav_surlpus'>
                                                    <i className="fa fa-donate me-2"></i>
                                                    {formatMoney(User?.surplus)}
                                                </Nav.Link>
                                            </>

                                            :
                                            <>
                                                <Nav.Link className='btn_authen btn btn-outline-success me-2' href="/login">Sign in</Nav.Link>
                                                <Nav.Link className='btn_authen btn btn-outline-success' href="/login">Register now</Nav.Link>
                                            </>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
            <News />
            {
                Store?.length > 0 && AccessToken &&
                <div id='store_user'>
                    <div className='btn_show_store'>
                        <i className="fa fa-shopping-cart"></i>
                        <span className='noti'>{Store.length}</span>
                    </div>
                    <div className='store_item bgr_white'>
                        <p className='m-0 p-0 txt_bold'>Gi??? h??ng</p>
                        <p className='text-danger'><span className='txt_bold'>{Store.length}</span> s???n ph???m</p>
                        <Link className='btn btn-success' href={`/${User.userName}/store`}>Thanh to??n ngay</Link>
                    </div>
                </div>

            }
        </>

    );
}

export default Hearder;