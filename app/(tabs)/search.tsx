import Searchbar from "@/components/searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../../components/MovieCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSeacInputChange(text: string) {
    setSearchQuery(text);
  }

  useEffect(() => {}, [searchQuery]);

  let {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    reset,
    refetch: loadMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  if (!movies) {
    movies = fetchMovies({ query: searchQuery });
  }

  useEffect(() => {
    const fun = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        if (movies?.length > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(fun);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-20 ">
              <Image
                source={icons.search}
                className="w-12 h-10"
                resizeMode="contain"
              />
            </View>
            <View className="my-5">
              <Searchbar
                placeholder="search movies"
                value={searchQuery}
                onChangeText={handleSeacInputChange}
              />
            </View>
            {moviesLoading ? (
              <View className="mt-10 self-center">
                <ActivityIndicator
                  size={"large"}
                  color={"#fff"}
                  className="mt-10 self-center"
                />
              </View>
            ) : null}
            {moviesError && (
              <>
                <Text className="text-red-500 px-5 my-3">
                  Error: {moviesError.message}
                </Text>
              </>
            )}
            {!moviesLoading && !moviesError && movies?.length > 0 && (
              <Text className="text-white font-bold">
                search results for
                {searchQuery ? (
                  <Text className="text-accent"> {searchQuery}</Text>
                ) : (
                  <Text className="text-accent"> SEARCH TERM</Text>
                )}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError && movies?.length === 0 ? (
            <>
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-400">
                  {searchQuery.trim()
                    ? "No movies found"
                    : "Search for a movie"}
                </Text>
              </View>
            </>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
