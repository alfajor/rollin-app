import { useState } from 'react';
import { MapProvider } from './components/map/map-context';
import Map from './components/map/map';
import Search from './components/search';
import styled from 'styled-components';
import { globalStyles } from '../utils/global-styles';

const App = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const modalTriggerHandler = () => {
    setModalVisibility(!modalVisibility)
  }

  return (
    <>
    {/* wrap in map provider context for cross component props access */}
    <MapProvider> 
      <MainContainer>  
        <MapWrapper>
          <ContentWrapper>     
            <img src="icons/bjj-belt.png" alt="bjj belt icon" />
            <ModalMenu onClick={modalTriggerHandler}>
              <a href="#">about</a>
            </ModalMenu>
            <h1>Rollin' App</h1>

            {/* about modal */}
            <ModalWrapper isVisible={modalVisibility} onClick={modalTriggerHandler}>
              <h3>About Rollin' App</h3>

              <ModalTextWrapper>
                <p>We love training in BJJ but finding academies can be tedious.</p> 
                <p>Ditch the search engine and locate academies near you in one place. 
                  Get the address, website and academy details in one easy search, complete 
                  with map results.
                </p>

                <h4>Want to contribute to this project?</h4>
                <p>We're always looking for help to make this app more complete. Check out the repo for info on contributing.</p>
                <a href="https://github.com/alfajor/rollin-app" target="_blank"><img src="/icons/github.png" /></a>
              </ModalTextWrapper>
            </ModalWrapper>

            <h3>Find BJJ academies in your area.</h3>
  
            <Search />

            <FooterContent>
              <p>&copy; {new Date().getFullYear()}. 
                <a href="https://bluefiginteractive.com" target="_blank"> Blue Fig Interactive </a>
                fueled by <img src="/icons/espresso-icon.png" />
              </p>
            </FooterContent>
          </ContentWrapper>
            
          <Map />
        </MapWrapper>
       
      </MainContainer>
    </MapProvider>
    </>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapWrapper = styled.div`
  display: flex;

  @media screen and (max-width: ${globalStyles.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 50%;
  margin-top: 30px;

  @media screen and (max-width: ${globalStyles.breakpoints.md}) {
    width: 100%;
  }

  img {
    width: 25%;
  }
`;

const ModalMenu = styled.div`

`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 8px;
  z-index: 77;
  background-color: #34EDAF;
  color: #222;
  display: ${(props) => props.isVisible ? 'flex' : 'none'};
  flex-flow: column;
  align-items: center;
  width: 60%;
  height: 100%;
`;

const ModalTextWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  width: 60%;
  border-top: 1px solid #222;
  font-size: 18px;

  img {
    width: 30px;
    height: 30px;
  }
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
