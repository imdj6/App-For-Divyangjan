import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/UserScreens/ProfileScreen";
import HomeScreen from "./screens/UserScreens/HomeScreen";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import useAuth  from "./hooks/useAuth";
import MainScreen from "./screens/AuthScreens/MainScreen";
import SignupScreen from "./screens/AuthScreens/SignupScreen";
import DataInputScreen from "./screens/UserScreens/DataInputScreen";
import DemoScreen from "./screens/UserScreens/DemoScreen";
import AnimationScreen from "./screens/UserScreens/AnimationScreen";

function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.9)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          shadowRadius: 4,
          elevation: 4,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DataInputScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={24} color="white" />
            ) : (
              <FontAwesome name="user-o" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();

function Navigation() {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Data"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Demo"
            component={DemoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Animation"
            component={AnimationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Auth"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Navigation;
