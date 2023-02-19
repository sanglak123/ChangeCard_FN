import Banks from '@/components/dashboard/Banks';
import BuyCards from '@/components/dashboard/BuyCards';
import Cards from '@/components/dashboard/Cards';
import ChangeCards from '@/components/dashboard/ChangeCards';
import Prices from '@/components/dashboard/Prices';
import DashboardProfile from '@/components/dashboard/Profile';
import DashboardSystems from '@/components/dashboard/Systems';
import DashboardTopup from '@/components/dashboard/Topup';
import DashboardUsers from '@/components/dashboard/Users';
import DashboardWithdraw from '@/components/dashboard/Withdraw';
import { AdminSelector } from '@/redux/selector/AdminSelector';
import { LoadingDataAdminSuccess, LogoutAdminSuccess } from '@/redux/slice/AdminSlice';
import { ApiAdmins } from 'data/api/admins';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard(props) {
    const dispatch = useDispatch();
    const router = useRouter();

    const Admin = useSelector(AdminSelector.Admin);
    const AccessToken = useSelector(AdminSelector.AccessToken);
    const [views, setViews] = useState("Systems");

    const handleRenderViewsDashboard = () => {
        switch (views) {
            case "Users": return <DashboardUsers />
            case "Prices": return <Prices />
            case "Cards": return <Cards />
            case "ChangeCards": return <ChangeCards />
            case "BuyCards": return <BuyCards />
            case "Banks": return <Banks />
            case "Withdraws": return <DashboardWithdraw />
            case "Topups": return <DashboardTopup />
            case "Profile": return <DashboardProfile />

            default:
                return <DashboardSystems />
        }
    };

    useEffect(() => {
        const LoadingDataAdmin = async () => {
            await ApiAdmins.Data.GetAll(dispatch, LoadingDataAdminSuccess)
        };
        LoadingDataAdmin();
    }, []);

    const handleAdminLogout = async () => {
        await ApiAdmins.Authen.Logout(dispatch, LogoutAdminSuccess, router, AccessToken);     
    };

    return (
        AccessToken ?
            <div id='Dashboard'>
                <div className='dashboard_content'>

                    <div className='dashboard_menu bgr_white p-0'>

                        <div className='menu_hearder'>
                            <div className='avatar'>
                                <img src={Admin?.Img?.path} alt={Admin?.userName} className='img-fluid' />
                            </div>
                            <p>{Admin?.displayName ? Admin?.displayName : Admin?.userName}</p>
                        </div>

                        <div className='menu_content'>

                            <div className={views === "Systems" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Systems")}>
                                <p>System</p>
                                <i className="fa fa-server"></i>
                            </div>
                            <div className={views === "Users" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Users")}>
                                <p>Users</p>
                                <i className="fa fa-user-friends"></i>
                            </div>
                            <div className={views === "Cards" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Cards")}>
                                <p>Cards</p>
                                <i className="fa fa-money-check-alt"></i>
                            </div>
                            <div className={views === "Prices" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Prices")}>
                                <p>Prices</p>
                                <i className="fa fa-money-check-alt"></i>
                            </div>
                            <div className={views === "ChangeCards" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("ChangeCards")}>
                                <p>Change Cards</p>
                                <i className="fa fa-exchange-alt"></i>
                            </div>
                            <div className={views === "BuyCards" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("BuyCards")}>
                                <p>Buy Cards</p>
                                <i className="fa fa-audio-description"></i>
                            </div>
                            <div className={views === "Banks" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Banks")}>
                                <p>Banks</p>
                                <i className="fa fa-university"></i>
                            </div>
                            <div className={views === "Withdraws" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Withdraws")}>
                                <p>Withdraw</p>
                                <i className="fa fa-hand-holding-usd"></i>
                            </div>
                            <div className={views === "Topups" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Topups")}>
                                <p>Topup</p>
                                <i className="fa fa-dollar-sign"></i>
                            </div>
                            <div className={views === "Profile" ? "menu_active menu_item" : "menu_item"} onClick={() => setViews("Profile")}>
                                <p>Profile</p>
                                <i className="fa fa-user-cog"></i>
                            </div>
                            <div className='menu_item' onClick={() => handleAdminLogout()}>
                                <p>Sign out</p>
                                <i className="fa fa-sign-out-alt"></i>
                            </div>

                        </div>
                    </div>

                    <div className='dashboard_views '>

                        <div className='dashboard_views_hearder'>
                            <div className='views_hearder_item bgr_white'>
                                <div className='hearder_left'>
                                    <span>Dashboard</span> - <span>{views}</span>
                                </div>
                                <div className='hearder_right'>
                                    <Link href={"/"}>Back to home</Link>
                                </div>
                            </div>

                        </div>

                        <div className='views_items'>
                            {handleRenderViewsDashboard()}
                        </div>

                    </div>

                </div>
            </div>
            :
            <h1>Bạn Cần Đăng Nhập</h1>
    );
}

export default Dashboard;