import styled from 'styled-components';

const Button = ({buttonText, buttonLink, textColor, backgroundColor, borderColor}) => {
    return (
        <>
            <a href={buttonLink}>
                <StyledButton textColor={textColor} backgroundColor={backgroundColor} borderColor={borderColor}>{buttonText}</StyledButton>
            </a>
        </>
    )
}

const StyledButton = styled.div`
    width: 80px;
    padding: 6px 25px;
    text-align: center;
    cursor: pointer;
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'transparent'};
    color: ${(props) => props.textColor ? props.textColor : '#fff'};
    border: 1px solid ${(props) => props.borderColor ? props.borderColor : '#fff'};
`;

export default Button;