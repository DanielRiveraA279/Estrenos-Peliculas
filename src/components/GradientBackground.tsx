import React, { useContext, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useFade } from '../hooks/useFade';

interface Props {
    children: JSX.Element | JSX.Element
}

export const GradientBackground = ({ children }: Props) => {

    const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);
    const { opacity, fadeIn, fadeOut } = useFade();

    useEffect(() => {
        fadeIn(() => {
            setPrevMainColors(colors);
            fadeOut(0); //cuando termina
        });

        //cada vez que cambian los colores principales
    }, [colors])

    //absoluteFillObject: propiedad para que el view se expanda totalmente
    return (
        <View style={{ flex: 1 }}>

            {/*Gradient en el fondo */}
            <LinearGradient
                colors={[colors.primary, colors.secondary, 'white']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.5, y: 0.7 }}
            />

            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity
                }}
            >

                {/*Gradient sobre el fondo */}
                <LinearGradient
                    colors={[colors.primary, colors.secondary, 'white']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.5, y: 0.7 }}
                />

            </Animated.View>
            {children}
        </View>
    )
}