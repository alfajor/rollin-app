import Map from './components/map';
import Search from './components/search';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <MainContainer>  
        <MapWrapper>
          <ContentWrapper>
            <h1>Rollin' App</h1>
            <h3>Locate BJJ academies in your area.</h3>
    
            <Search />

            <FooterContent>
              <p>&copy; {new Date().getFullYear()}. powered by <img src="../public/icons/espresso-icon.png" /> and <a href="https://bluefiginteractive.com" rel="nofollow" target="_blank">Blue Fig Interactive</a></p>
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

const FooterContent = styled.div`
  /* position: absolute; */
  /* bottom: 0; */

  img {
    position: relative;
    top: 3px;
    width: 25px;
    height: 25px;
  }
`;


export default App;
