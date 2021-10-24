import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getFromLS } from '../../utils/storage';
import useTheme from '../../utils/useTheme';

const HeaderBox = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    background: ${({ theme: { colors } }) => colors.secondary}
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 1em;
    margin-left: auto;
    border: none;
    border-left: 1px solid #000;
    cursor: pointer;
    color: ${({ theme: { colors: { button } } }) => button.text};
    background: ${({ theme: { colors: { button } } }) => button.background};
`;

const HeaderInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    
    @media(max-width: 500px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

const HeaderTimerBox = styled.div`
    padding: 0.5rem;
    font-size: 0.875rem;
    color: ${({ theme: { colors } }) => colors.text};
`;

const HeaderText = styled.div`
    padding: 0.5rem;
    font-weight: 600;
    font-style: italic;
    color: ${({ theme: { colors } }) => colors.text};
`;

const Emoji = styled.span`
    margin-left: 0.25rem;
`;

const Header = ({ themeSwitcher }) => {
    const [timer, updateTimer] = useState(0);
    const timeRemaining = useSelector((state) => state.time.timeRemaining);
    const activeTheme = getFromLS('theme');
    const { setMode } = useTheme();
    const { data: { light, dark } } = getFromLS('allThemes');

    if (!activeTheme) {
        setMode(light);
    }

    const mode = `${activeTheme.name === 'Dark' ? 'Light' : 'Dark'} mode`;
    const modeImg = activeTheme.name === 'Dark' ? '🌞' : '🌘';

    const handleThemesSwitch = () => {
        const currentTheme = activeTheme.name === 'Dark' ? light : dark;

        setMode(currentTheme);
        themeSwitcher(currentTheme);
    };

    useEffect(() => {
        const timeoutTimer = setInterval(() => {
            updateTimer((prevState) => prevState - 1);
        }, 1000);

        return () => {
            clearInterval(timeoutTimer);
        };
    }, []);

    useEffect(() => {
        updateTimer(timeRemaining);
    }, [timeRemaining]);

    return (
        <HeaderBox>
            <HeaderInfo>
                <HeaderText>Front-end Test Candidate</HeaderText>
                <HeaderTimerBox>
                    {`${timer} seconds remaining`}
                </HeaderTimerBox>
            </HeaderInfo>
            <Button
                type="button"
                onClick={handleThemesSwitch}
            >
                {mode}
                <Emoji role="img">{modeImg}</Emoji>
            </Button>
        </HeaderBox>
    );
};

Header.propTypes = {
    themeSwitcher: PropTypes.func,
};

Header.defaultProps = {
    themeSwitcher: () => {},
};

export default Header;
