import Link from 'next/link';
import React from 'react';
import { Container } from 'react-bootstrap';

function ErrorLogin(props) {
    return (
        <div id='error_login'>
            <Container>
                <div className='bgr_white mt-4 mb-4'>
                    <h1 className='text-danger'>Bạn chưa đăng nhập!</h1>
                    <Link href={"/login"}>Đăng nhập hoặc đăng ký</Link>
                </div>
            </Container>

        </div>
    );
}

export default ErrorLogin;