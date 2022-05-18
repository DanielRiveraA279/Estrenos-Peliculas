import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';

//si sale error en la importacion instalar con: yarn add -D @types/react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;

//extiende de NativeStackScreenProps y le pasamos la interface y el nombre del screen
interface Props extends NativeStackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>

      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? <ActivityIndicator
        size={35}
        color="gray"
        style={{ marginTop: 20 }}
      /> : <MovieDetails movieFull={movieFull!} cast={cast} />}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
        <Icon
          color="white"
          name="arrow-back-outline"
          size={100}


        />
      </TouchableOpacity>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',

    //alto de un 70% de la pantalla
    height: screenHeight * 0.7,

    //sombras de imagenes
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    //para ios por las dudas
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  imageBorder: {
    flex: 1,
    //configuracion para redondear los border de abajo de la imagen, obligandolo con overflow
    overflow: 'hidden', //obligar a los hijos a respetar sus bordes de abajo, en este caso la imagen
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1,

  },
  marginContainer: {
    marginHorizontal: 25,
    marginTop: 25
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    zIndex: 999, //para ios
    elevation: 9, //para android,
    top: 30,
    left: 2,
    opacity: 0.6
  }
})