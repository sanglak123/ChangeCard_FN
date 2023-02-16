import ErrorLogin from '@/layout/errorLogin/ErrorLogin';
import { UserSelector } from '@/redux/selector/UserSelector';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function UserTopUp(props) {
    const router = useRouter();
    const { userName } = router.query;
    const AccessToken = useSelector(UserSelector.AccessToken);
    return (
        <div id='topup'>
            {
                AccessToken ?
                    <p> Nạp Tiền {userName}</p>
                    :
                    <ErrorLogin />
            }

        </div>
    );
}

export default UserTopUp;