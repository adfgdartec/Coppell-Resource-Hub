
import { Stack } from 'expo-router';

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: 'page',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
  
      <Stack.Screen name = "page" options = {{headerShown: false}} />


    </Stack>
  );
}
