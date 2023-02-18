import UserChangeCard from '@/components/changeCard/ChangeCard';
import TablePrices from '@/components/tablePrices';
import React from 'react';
import { Container } from 'react-bootstrap';

function ChangeCardsPage(props) {
    return (
        <div id='change_cards'>
            <Container>
                <UserChangeCard />
                <TablePrices />
            </Container>

        </div>
    );
}

export default ChangeCardsPage;