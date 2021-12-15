import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = () => {
    return fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((result) => {
        setData(result.movies);
        console.log(result.movies);
      })
      .catch((e) => console.log(e))
      .finally(setLoading(false));
  };

  useEffect(() => {
    setTimeout(() => {
      getMovies();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <ActivityIndicator size={"large"}></ActivityIndicator>
          <Text>Waiting for data...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item, index }) => (
              <Text>
                {item.id + ". " + item.title + " (" + item.releaseYear + ")"}
              </Text>
            )}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
