import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Home = () => {
    return (
        <section>
            <div>
                <h1>NFT Art Heist</h1>
                <p>Steal the NFT and it's yours to keep!</p>
                <Link href={'/heist'}>
                    <Button color="primary">ENTER HEIST</Button>
                </Link>
            </div>
        </section>
    );
};

export default Home;
