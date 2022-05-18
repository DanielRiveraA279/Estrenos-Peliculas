import React, { useRef } from 'react';
import { Animated } from 'react-native';

export const useFade = () => {

    //Animaciones config de inicio
    const opacity = useRef(new Animated.Value(0)).current;

    const fadeIn = (callback?: Function) => {
        Animated.timing(
            opacity, //que vamos a animar
            {
                toValue: 1, //que valla al valor de 1 para que sea visible
                duration: 1000, //duracion de la animacion
                useNativeDriver: true //helerar por hardware
            }

            //si el callback existe llamo y si no envio un null
        ).start(() => callback ? callback() : null);
    }

    const fadeOut = (duration: number = 300) => {
        Animated.timing(
            opacity, //que vamos a animar
            {
                toValue: 0, //que valla al valor de 1 para que sea visible
                duration, //duracion de la animacion
                useNativeDriver: true //helerar por hardware
            }
        ).start()
    }

    return {
        fadeIn,
        fadeOut,
        opacity
    }
}