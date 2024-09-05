import React, { useState, useEffect } from 'react';
import { Grid, CardContent, Typography, Select, MenuItem, Tooltip, Button, CardMedia, IconButton, Card, CardActions } from '@mui/material';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import SecurityIcon from '@mui/icons-material/Security';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HttpsIcon from '@mui/icons-material/Https';
import InfoIcon from '@mui/icons-material/Info';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import styles from '../styles/Heist.module.scss';

const Heist = () => {
    const [strategy, setStrategy] = useState<any>({
        entry: '',
        opportunity: '',
        steal: '',
        escape: ''
    });

    const handleChange = (level: string, value: string) => {
        setStrategy((prevStrategy: any) => {
            const updatedStrategy = { ...prevStrategy, [level]: value };
            console.log('Updated strategy:', updatedStrategy);
            return updatedStrategy;
        });
        playSound();
    };

    const difficultyLevels = {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard'
    };

    const getDifficulty = (choice: string) => {
        switch (choice) {
            case 'Visitor':
            case 'Disguise':
            case 'Disable Cameras':
                return difficultyLevels.easy;
            case 'Janitor':
            case 'Back Door':
            case 'Cut Power':
                return difficultyLevels.medium;
            case 'Roof':
            case 'Blend In':
            case 'Hack System':
                return difficultyLevels.hard;
            default:
                return 'Select an option';
        }
    };

    const getImage = (level: string) => {
        switch (strategy[level]) {
            case 'Visitor':
                return '/images/levels/visitor.webp';
            case 'Disguise':
                return '/images/levels/disguise.webp';
            case 'Janitor':
                return '/images/levels/janitor.webp';
            case 'Roof':
                return '/images/levels/roof.webp';
            case 'Back Door':
                return '/images/levels/backdoor.webp';
            case 'Sewer System':
                return '/images/levels/sewer.webp';
            case 'Blend In':
                return '/images/levels/blendin.png';
            case 'Distraction':
                return '/images/levels/distraction.png';
            case 'Disable Cameras':
                return '/images/levels/disablecameras.png';
            case 'Cut Power':
                return '/images/levels/cutpower.webp';
            case 'Knock Out Guard':
                return '/images/levels/knockoutguard.webp';
            case 'Escape Roof':
                return '/images/levels/roof.webp';
            case 'Escape Back Door':
                return '/images/levels/backdoor.webp';
            case 'Escape Sewer System':
                return '/images/levels/sewer.webp';
            default:
                return '/images/levels/default.webp';
        }
    };

    const playSound = () => {
        const sound = new Howl({
            src: ['/sounds/select.mp3']
        });
        sound.play();
    };

    const startHeistSound = () => {
        const sound = new Howl({
            src: ['/sounds/heist_start.mp3']
        });
        sound.play();
    };

    const renderMenuItems = (level: string) => {
        switch (level) {
            case 'entry':
                return [
                    <MenuItem key="Visitor" value="Visitor">
                        Visitor
                    </MenuItem>,
                    <MenuItem key="Disguise" value="Disguise">
                        Disguise as Guard
                    </MenuItem>,
                    <MenuItem key="Janitor" value="Janitor">
                        Janitor
                    </MenuItem>
                ];
            case 'opportunity':
                return [
                    <MenuItem key="Disable Cameras" value="Disable Cameras">
                        Disable Cameras
                    </MenuItem>,
                    <MenuItem key="Cut Power" value="Cut Power">
                        Cut Power
                    </MenuItem>,
                    <MenuItem key="Knock Out Guard" value="Knock Out Guard">
                        Distract Guards
                    </MenuItem>
                ];
            case 'escape':
                return [
                    <MenuItem key="Roof" value="Roof">
                        Roof
                    </MenuItem>,
                    <MenuItem key="Back Door" value="Back Door">
                        Back Door
                    </MenuItem>,
                    <MenuItem key="Sewer System" value="Sewer System">
                        Sewer System
                    </MenuItem>
                ];
            default:
                return null;
        }
    };

    // useEffect for looping background music
    useEffect(() => {
        const sound = new Howl({
            src: ['/sounds/intro.mp3'], // Ensure this path is correct
            loop: true,
            volume: 0.35 // Adjust the volume if needed
        });

        sound.play();

        // Clean up to stop the sound when the component unmounts
        return () => {
            sound.stop();
        };
    }, []);

    return (
        <div className={styles.heistContainer}>
            <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 40 }} transition={{ duration: 1 }}>
                <Typography variant="h4" className={styles.title} gutterBottom>
                    Prepare for the Heist
                </Typography>
                <Typography variant="h6" className={styles.subtitle} gutterBottom>
                    Choose your strategy wisely, your choices will have consequences.
                </Typography>
            </motion.div>
            <Grid container spacing={4} justifyContent="center" className={styles.gridContainer}>
                {['entry', 'opportunity', 'escape'].map((level, index) => (
                    <Grid item key={level}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            // transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Card className={styles.card}>
                                <CardMedia component="img" height="250" image={getImage(level)} alt={`${level} Strategy`} className={styles.cardMedia} />
                                <CardContent className={styles.cardContent}>
                                    <Typography variant="h6" gutterBottom>
                                        <IconButton className={styles.iconButton} size="small">
                                            {level === 'entry' ? <SecurityIcon /> : level === 'opportunity' ? <HttpsIcon /> : <ExitToAppIcon />}
                                        </IconButton>{' '}
                                        {level === 'entry' ? 'Method of Entry' : level === 'opportunity' ? 'Diversion' : 'Escape Route'}
                                    </Typography>
                                    <Select
                                        value={strategy[level]} // This should reflect the current state
                                        onChange={(e) => handleChange(level, e.target.value as string)}
                                        fullWidth
                                        displayEmpty
                                        variant="outlined"
                                        className={styles.selectField}
                                    >
                                        <MenuItem value="" disabled>
                                            {`Select ${level.charAt(0).toUpperCase() + level.slice(1)}`}
                                        </MenuItem>
                                        {renderMenuItems(level)}
                                    </Select>

                                    <Typography variant="body2" className={styles.difficultyText}>
                                        Difficulty: {getDifficulty(strategy[level])}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
                <Grid item>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Card className={styles.card}>
                            <CardMedia component="img" height="250" image="/images/levels/default.webp" alt="Steal the NFT" className={styles.cardMedia} />
                            <CardContent className={styles.cardContent}>
                                <Typography variant="h6" gutterBottom>
                                    Steal the NFT
                                    <IconButton className={styles.iconButton} size="small">
                                        <InfoIcon />
                                    </IconButton>
                                </Typography>
                                <Tooltip title="Solve a complex logic puzzle to steal the NFT" arrow>
                                    <Typography variant="body2" className={styles.difficultyText}>
                                        Difficulty: Hard
                                    </Typography>
                                </Tooltip>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
            <CardActions>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={() => {
                            console.log('Start Heist with strategy:', strategy);
                            startHeistSound();
                        }}
                        endIcon={<DirectionsRunIcon />}
                        className={styles.startButton}
                    >
                        Start the Heist
                    </Button>
                </motion.div>
            </CardActions>
        </div>
    );
};

export default Heist;
