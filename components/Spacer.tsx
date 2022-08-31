import { View } from 'react-native'
interface Props {
    spacingValue?: number;
}
export default function Spacer({ spacingValue = 1 }: Props) {
    return <View style={{ height: 8 * spacingValue }} />;
}