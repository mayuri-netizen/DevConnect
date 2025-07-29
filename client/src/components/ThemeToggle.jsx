import React, { useState, useEffect } from 'react';

// Simple CSS for the toggle button, can be moved to its own file
const toggleStyles = `
.theme-toggle {
    background: transparent;
    border: 1px solid var(--border-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}
.theme-toggle:hover {
    background-color: rgba(128, 128, 128, 0.1);
    transform: scale(1.1);
}
.theme-toggle svg {
    width: 20px;
    height: 20px;
    fill: var(--text-color);
}
`;

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <>
            <style>{toggleStyles}</style>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-4.999 9.25c0 5.523 4.477 10 10 10 3.553 0 6.63-1.84 8.448-4.648A9.004 9.004 0 0 1 12 11.807z"></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"></path></svg>
                )}
            </button>
        </>
    );
};

export default ThemeToggle;