import Navigation from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
// import { app } from './config/firebase';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
