import * as React from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("./assets/humanIcon1.png")}
    />
  );
}

function HomeScreen({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      title: "My Home",
      headerStyle: {
        backgroundColor: "#f4511e",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTitle: (props) => <LogoTitle {...props} />,
      headerRight: () => (
        <Button
          onPress={() => Alert.alert("This is a button!")}
          title="Info"
          color="#fff"
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      Alert.alert(`Home Screen is focused`);
      return () => {
        Alert.alert(`Leaving Home Screen `);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title: `Details for item ${itemId}`,
      headerBackTitle: "Custom Back",
      headerBackTitleStyle: { fontSize: 30 },
    });
  }, [navigation, itemId]);

  useFocusEffect(
    React.useCallback(() => {
      Alert.alert(`Details Screen is focused`);
      return () => {
        Alert.alert(`Leaving Current Screen `);
      };
    }, [itemId])
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
