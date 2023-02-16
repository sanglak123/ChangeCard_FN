import { useRouter } from 'next/router';
import React from 'react';

function UserWithdraw(props) {
    const router = useRouter();
    const { userName } = router.query;
    return (
        <div>
            Rút tiền {userName}
        </div>
    );
}

export default UserWithdraw;