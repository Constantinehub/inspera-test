import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled, { ThemeProvider } from 'styled-components';
import { setRemainingTime } from '../actions/timeActions';
import timeService from '../services/timeService';
import Header from './header/Header';
import useTheme from '../utils/useTheme';
import { getFromLS } from '../utils/storage';

const list = [
    { id: 1, value: 'Alternative 1' },
    { id: 2, value: 'Alternative 2' },
    { id: 3, value: 'Alternative 3' },
];

const GET_REMAINING_TIME_TIMER = 10 * 1000; // every 10 seconds
let interval;

const InputLabel = styled.label`
    display: flex;
    align-items: center;
    max-width: 40em;
    border-bottom: 1px solid #ccc;
    color: ${({ theme: { colors } }) => colors.text};
    background: ${({ theme: { colors } }) => colors.primary};
`;

const AppBody = styled.div`
    padding: 1em;
`;

const App = () => {
    const currentTheme = getFromLS('theme');
    const { theme, themeLoaded, setMode } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);

    if (!currentTheme) {
        setMode(theme);
    }

    const dispatch = useDispatch();

    const updateTime = async () => {
        const timeRemaining = await timeService.requestUpdatedTime();
        dispatch(setRemainingTime(timeRemaining));
    };

    useEffect(async () => {
        await updateTime();
        interval = setInterval(() => {
            updateTime();
        }, GET_REMAINING_TIME_TIMER);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [themeLoaded]);

    return (
        <ThemeProvider theme={selectedTheme}>
            <div className="app-wrapper default">
                <Header themeSwitcher={setSelectedTheme} />
                <AppBody>
                    <h1>Welcome to your Inspera exam</h1>
                    <hr />
                    <div className="text-interaction">
                        <label htmlFor="input">
                            <p>What is your answer?</p>
                            <input
                                id="input"
                                placeholder="Type your text here..."
                            />
                        </label>
                    </div>
                    <hr />
                    <div className="mpc-interaction">
                        {list.map(({ id, value }) => (
                            <InputLabel key={id} htmlFor={id}>
                                <input id={id} type="checkbox" value={value} />
                                <p>{value}</p>
                            </InputLabel>
                        ))}
                    </div>
                </AppBody>
            </div>
        </ThemeProvider>
    );
};

export default App;
