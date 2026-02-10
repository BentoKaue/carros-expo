import { Tabs } from "expo-router";
import { Image } from "react-native";
import { COLORS } from "../../src/theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.text },
        headerTintColor: COLORS.textLight,
        headerTitleAlign: "center",

        // 👇 LOGO NO LUGAR DO TEXTO
        headerTitle: () => (
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 160,
              height: 45,
              resizeMode: "contain",
            }}
          />
        ),

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="carros"
        options={{
          title: "Carros", 
        }}
      />

      <Tabs.Screen
        name="clientes"
        options={{
          title: "Clientes",
        }}
      />

      <Tabs.Screen
        name="vendas"
        options={{
          title: "Vendas",
        }}
      />

    </Tabs>
  );
}
