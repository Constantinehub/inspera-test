import { useState, useEffect } from 'react';
import { setToLS, getFromLS } from './storage';

const useTheme = () => {
    const { data: { light } } = getFromLS('allThemes');
    const [theme, setTheme] = useState(light);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const setMode = (mode) => {
        setToLS('theme', mode);
        setTheme(mode);
    };

    useEffect(() => {
        const localTheme = getFromLS('theme');
        const currentTheme = localTheme || light;

        setTheme(currentTheme);
        setThemeLoaded(true);
    }, []);

    return { theme, themeLoaded, setMode };
};

export default useTheme;
