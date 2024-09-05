import { Container, StatusButtonDel, StatusCard, StatusContainer, StatusIcon, StatusTextContainer, TextStatus, Title, TitleContainer, TopButton, TopContainer, TopText } from "./styles";
import { Feather } from "@expo/vector-icons"
import { RootStackParamList } from "../../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList>;


export default function Details({ route }: any) {

    const { id, title, status } = route.params;
    const navigation = useNavigation<Props['navigation']>();

    return (
        <Container>
            <TopContainer>
                <TopButton onPress={() => navigation.popToTop()}>
                    <Feather name="chevron-left" size={24} color="white" />
                    <TopText>Voltar</TopText>
                </TopButton>
            </TopContainer>

            <TitleContainer>
                <Title>{title}</Title>
            </TitleContainer>

            <TextStatus>Status da tarefa: </TextStatus>

            <StatusContainer>
                <StatusCard>
                    <StatusIcon style={status ? { backgroundColor: '#0E9577' } : {}}>
                        {!status && <Feather name="square" size={24} color="white" />}
                        {status && <Feather name="check-square" size={24} color="white" />}
                    </StatusIcon>
                    <StatusTextContainer>
                        <TextStatus>{status ? "Realizada" : "Andamento"}</TextStatus>
                    </StatusTextContainer>
                </StatusCard>

                <StatusButtonDel>
                    <Feather name="trash-2" size={24} color="white" />
                </StatusButtonDel>
            </StatusContainer>
        </Container>
    );
}
