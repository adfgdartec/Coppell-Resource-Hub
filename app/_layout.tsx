
import { Stack } from 'expo-router';

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
  
      <Stack.Screen name = "index" options = {{headerShown: false}} />
      <Stack.Screen name = "resource/[id]" options = {{headerShown: false}} />
      <Stack.Screen name = "search/page" options = {{headerShown: false}} />
      <Stack.Screen name = "survey_one" options = {{headerShown: false}} />
      <Stack.Screen name = "survey_two" options = {{headerShown: false}} />

    </Stack>
  );
}
