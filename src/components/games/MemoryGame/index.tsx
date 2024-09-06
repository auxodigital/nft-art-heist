import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Button, Modal, Typography } from '@mui/material';
import { FaApple, FaFacebook, FaGoogle, FaTwitter, FaLinkedin, FaReact, FaNodeJs, FaJs, FaPython, FaPhp, FaCss3, FaHtml5 } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

interface Card {
    name: string;
    icon: React.ReactElement;
    id: number;
}

const initialCards: Card[] = [
    { name: 'Apple', icon: <FaApple />, id: 1 },
    { name: 'Facebook', icon: <FaFacebook />, id: 2 },
    { name: 'Google', icon: <FaGoogle />, id: 3 },
    { name: 'Twitter', icon: <FaTwitter />, id: 4 },
    { name: 'LinkedIn', icon: <FaLinkedin />, id: 5 },
    { name: 'React', icon: <FaReact />, id: 6 },
    { name: 'Node.js', icon: <FaNodeJs />, id: 7 },
    { name: 'JavaScript', icon: <FaJs />, id: 8 },
    { name: 'Python', icon: <FaPython />, id: 9 },
    { name: 'PHP', icon: <FaPhp />, id: 10 },
    { name: 'CSS3', icon: <FaCss3 />, id: 11 },
    { name: 'HTML5', icon: <FaHtml5 />, id: 12 }
];

const shuffleArray = (array: Card[]): Card[] => {
    return array.sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [pickedCards, setPickedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setCards(shuffleArray([...initialCards, ...initialCards]));
    }, []);

    useEffect(() => {
        if (pickedCards.length === 2) {
            const [firstIndex, secondIndex] = pickedCards;
            const firstCard = cards[firstIndex];
            const secondCard = cards[secondIndex];

            if (firstCard.id === secondCard.id) {
                setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
            }
            setTimeout(() => setPickedCards([]), 600);
        }
    }, [pickedCards, cards]);

    useEffect(() => {
        if (matchedCards.length === cards.length) {
            setTimeout(() => setShowModal(true), 1000);
        }
    }, [matchedCards, cards]);

    const handleRestart = () => {
        setCards(shuffleArray([...initialCards, ...initialCards]));
        setPickedCards([]);
        setMatchedCards([]);
        setShowModal(false);
    };

    const playFlipSound = () => {
        const sound = new Howl({
            src: ['/sounds/flip.mp3']
        });
        sound.play();
    };

    const handleCardClick = (id: number, index: number) => {
        if (pickedCards.length < 2 && !pickedCards.includes(index) && !matchedCards.includes(index)) {
            setPickedCards((prev) => [...prev, index]);
            playFlipSound();
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.game}>
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className={`${styles.card} ${pickedCards.includes(index) || matchedCards.includes(index) ? styles.flipped : ''}`}
                        onClick={() => handleCardClick(card.id, index)}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className={styles.inside}>
                            <div className={styles.front}>{card.icon}</div>
                            <div className={styles.back}></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className={styles.modal}>
                    <Typography variant="h2" className={styles.winner}>
                        You Rock!
                    </Typography>
                    <Button className={styles.restart} onClick={handleRestart}>
                        Play Again?
                    </Button>
                    <Typography className={styles.message}>
                        Developed on <a href="https://codepen.io">CodePen</a>
                    </Typography>
                    <div className={styles.social}>
                        <a href="https://twitter.com/share?url=https://codepen.io" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://www.facebook.com/sharer.php?u=https://codepen.io" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://plus.google.com/share?url=https://codepen.io" target="_blank" rel="noopener noreferrer">
                            <FaGoogle />
                        </a>
                    </div>
                </motion.div>
            </Modal>
        </div>
    );
};

export default MemoryGame;
