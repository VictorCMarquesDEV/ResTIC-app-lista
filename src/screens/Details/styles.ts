import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #28385E;
    align-items: start;
    justify-content: flex-start;
    padding: 20px;
    padding-top: 50px;
    gap: 16px;
`;

export const TopContainer = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

export const TopButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 16px;
`;

export const TopText = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
`;

export const TitleContainer = styled.View`
    background-color: #304163;
    border-radius: 4px;
    padding: 8px 16px;
`;

export const Title = styled.Text`
    color: #FFFFFF;
    font-size: 20px;
`;

export const StatusContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
`;

export const StatusCard = styled.View`
    background-color: #304163;
    border-radius: 4px;
    flex-direction: row;
    gap: 16px;
    flex: 1;
`;

export const TextStatus = styled.Text`
    color: #FFFFFF;
    font-size: 16px;
`;

export const StatusIcon = styled.View`
    background-color: #E88A1A;
    border-radius: 4px;
    padding: 16px;
`;

export const StatusTextContainer = styled.View`
    padding: 16px;
`;

export const StatusButtonDel = styled.TouchableOpacity`
    background-color: #F22424;
    border-radius: 4px;
    padding: 16px;
`;
