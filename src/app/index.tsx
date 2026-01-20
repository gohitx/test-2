import { Rocket } from 'lucide-react-native';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <View className="mb-4 rounded-3xl bg-orange-50 p-4">
        <Rocket size={48} color="purple" />
      </View>
      <Text className="text-3xl font-bold text-zinc-900 text-center">
        New test APP HOME 1
      </Text>
      <Text className="text-base text-zinc-500 mt-2 text-center">
        Welcome to your improved dashboard
      </Text>
    </View>
  );
}
