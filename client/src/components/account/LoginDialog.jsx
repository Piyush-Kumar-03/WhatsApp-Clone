import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { addUser } from "../../service/api";

const Wrapper = styled(Box)`
    background: white;
    border-radius: 12px;
    padding: 20px 30px;
    display: flex;
    flex-direction: row;
    box-shadow: none;
    width: 65%;
    height: auto;
`;

const Component = styled(Box)`
    display: flex;
`;

const Container = styled(Box)`
    padding: 20px;
    flex: 1;
`;

const Title = styled(Typography)`
    font-size: 26px;
    font-weight: 500;
    font-family: inherit;
    margin-bottom: 25px;
`;

const Title1 = styled(Typography)`
    font-size: 18px;
    color: #525252;
    margin-top: -20px;
`;

const StyledList = styled(List)`
    & > li {
        padding: 0;
        margin-top: 15px;
        font-size: 18px;
        line-height: 28px;
        font-weight: 400;
    }
`;
const StyledList1 = styled(List)`
    & > li {
        padding: 0;
        margin-top: 15px;
        font-size: 15px;
        line-height: 28px;
        font-weight: 400;
    }
`;

const QRCode = styled("img")({
    height: 264,
    width: 264,
    margin: "50px 0 0 50px",
    padding: 0,
});

const QRContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    margin-top: -10px;
`;

const dialogStyle = {
    height: "100vh",
    width: "100vw",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
};

const LoginDiag = () => {
    const { setAccount } = useContext(AccountContext);
    const onLoginSuccess = async (res) => {
        const decoded = jwtDecode(res.credential);
        setAccount(decoded);
        await addUser(decoded);
    }
    const onLoginError = (res) => {
        console.log('Login failed', res);
    }
    return (
        <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
            <Wrapper> {}
                <Component>
                    <Container>
                        <Title>Log in WhatsApp Web</Title>
                        <Title1>Message privately with friends and family using WhatsApp on your browser.</Title1>
                        <StyledList>
                            <ListItem>1. Open WhatsApp on your phone</ListItem>
                            <ListItem>2. Tap Menu on Android, or Settings on iPhone</ListItem>
                            <ListItem>3. Tap Linked devices and then Link a device</ListItem>
                            <ListItem>4. Point your phone at this screen to scan the QR code</ListItem>
                        </StyledList>
                        <StyledList1>
                            <ListItem sx={{ textDecoration: "underline", textDecorationColor: "green"}}>
                                Need help getting started?
                            </ListItem>
                            <ListItem sx={{ textDecoration: "underline", textDecorationColor: "green" }}>
                                Log in with phone number
                            </ListItem>
                        </StyledList1>
                    </Container>
                    <QRContainer style={{position: "relative"}}>
                        <QRCode src={qrCodeImage} alt="qr code" />
                        <Box style={{position: "absolute" , top: "45%", left: "56%", transform: "translate(-50%, -50%)"}}>
                            <GoogleLogin 
                                onSuccess={onLoginSuccess}
                                onError={onLoginError}
                            />
                        </Box>
                    </QRContainer>
                </Component>
            </Wrapper>
        </Dialog>
    );
};

export default LoginDiag;
