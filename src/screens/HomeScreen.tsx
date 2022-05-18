import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, Button, Dimensions, FlatList, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovie';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getPosterColor } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';


const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const { setMainColors } = useContext(GradientContext)

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getPosterColor(uri);

    //capturamos colores y llamamos al hooks para setear los colores con el analizador de colores
    setMainColors({
      primary,
      secondary
    })
  }

  useEffect(() => {
    //cuando el nowPlaying cambie
    if (nowPlaying.length > 0) {
      getPosterColors(0); //en base a la primera osea cuando inicie que construya los colores
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="red" size={50} />
      </View>
    )
  }




  return (
    <GradientBackground>
      <ScrollView>
        <View style={{ marginTop: top + 20 }}>
          <View style={{ height: 440 }}>
            {/*Carousel principal*/}
            <Carousel
              data={nowPlaying}
              renderItem={({ item }: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={(index) => getPosterColors(index)}
            />
          </View>

          <HorizontalSlider
            title="Populares"
            movies={popular}
          />
          <HorizontalSlider
            title="Top Rated"
            movies={topRated}
          />
          <HorizontalSlider
            title="Upcoming"
            movies={upcoming}
          />
        </View>
      </ScrollView>

    </GradientBackground>
  );
}
