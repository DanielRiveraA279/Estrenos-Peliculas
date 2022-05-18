import ImageColors from "react-native-image-colors"; //version 1.25.

export const getPosterColor = async (uri: string) => {
    const colors = await ImageColors.getColors(uri, {});

    let primary;
    let secondary;

    if (colors.platform === "android") {
        
        primary = colors.dominant; //dominante
        secondary = colors.average; //promedio
    } else {
        primary = colors.primary;
        secondary = colors.secondary;

    }

    return [
        primary,
        secondary
    ]

}