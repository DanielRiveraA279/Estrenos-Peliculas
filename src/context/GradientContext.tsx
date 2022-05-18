import React, { createContext, useState } from 'react';

//interface para los hooks
interface ImageColors {
    primary: string;
    secondary: string;
}

//definimos una interface de la info que va a manejar el context
interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setMainColors: (colors: ImageColors) => void;
    setPrevMainColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps) //TODO definir tipo


//retornamos jsx osea los hijos
export const GradientProvider = ({ children }: any) => {

    const [colors, setColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const [prevColors, setPrevColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent',
    });

    const setMainColors = (colors: ImageColors) => {
        setColors(colors);
    }

    const setPrevMainColors = (colors: ImageColors) => {
        setPrevColors(colors);
    }


    return (
        <GradientContext.Provider value={{
            colors,
            prevColors,
            setMainColors,
            setPrevMainColors
        }}>
            {children}
        </GradientContext.Provider>
    )
}