import { Container, CardTitle, CardValue } from './styles'

type Props = {
    title: string;
    num: number;
}

export function CardNumber({ title, num }: Props) {
    return (
        <Container>
            <CardTitle>{title}</CardTitle>
            <CardValue>{num}</CardValue>
        </Container>
    );
}