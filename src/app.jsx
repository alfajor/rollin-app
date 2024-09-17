import Map from './components/map';
import Button from './components/atoms/button';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <MainContainer>  
        <MapWrapper>
          <ContentWrapper>
            <h1>Rollin' App</h1>
            <h3>Locate BJJ academies and find partners to train.</h3>
            {/* auth / sign up - login */}
            <AuthWrapper>
              <Button buttonText={'Log in'} buttonLink={'/'} />
              <Button buttonText={'Register'} buttonLink={'/'} />
            </AuthWrapper>

            <FooterContent>
              <p>&copy; {new Date().getFullYear()} blahblahblah inc. </p>
            </FooterContent>
          </ContentWrapper>
            
          <Map />
        </MapWrapper>
      </MainContainer>
    </>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 40%;
  margin-top: 50px;
`;

const AuthWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const FooterContent = styled.div`
  position: absolute;
  bottom: 0;
`;


export default App;
