import { Feather } from '@expo/vector-icons';
import { Container, Input, InputButton } from "./styles";

type Props = {
    onPress: () => void;
    onChangeText: (text0: string) => void;
    onBlur: (e: any) => void;
    value: string;
}

export function InputAddTask({ onPress, onChangeText, onBlur, value }: Props) {
    return (
        <Container>
            <Input
                placeholder='Digite a tarefa'
                placeholderTextColor="#FFFFFF"
                keyboardType='default'
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
            />
            <InputButton onPress={onPress}
            >
                <Feather
                    name='plus-square'
                    size={24}
                    color='white'
                />
            </InputButton>
        </Container>
    );
}
