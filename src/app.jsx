import { MapProvider } from './components/map/map-context';
import Map from './components/map/map';
import Search from './components/search';
import styled from 'styled-components';
import { globalStyles } from '../utils/global-styles';
import NavMenu from "./components/atoms/menu";

const App = () => {

  return (
    <>
    {/* wrap in map provider context for cross component props access */}
    <MapProvider> 
      <MainContainer>  
        <MapWrapper>
          <ContentWrapper>
            {/* <NavMenu /> */}
            
            <img src="icons/bjj-belt.png" alt="bjj belt icon" />
            <h1>Rollin' App</h1>
            <h3>Find BJJ academies in your area.</h3>
    
            <Search />

            <FooterContent>
              <p>&copy; {new Date().getFullYear()}. <a href="https://bluefiginteractive.com" target="_blank">Blue Fig Interactive</a> fueled by <img src="/icons/espresso-icon.png" /></p>
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
  width: 45%;
  margin-top: 30px;

  @media screen and (max-width: ${globalStyles.breakpoints.md}) {
    width: 100%;
  }

  img {
    width: 25%;
  }
`;

const SignUpFormCTAWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 15px;
`;

const SignUpFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: ${(props) => props.showform == true ? '77' : '-1'};;
  opacity: ${(props) => props.showform == true ? '1' : '0'};
  height: ${(props) => props.showform == true ? '100%' : '0'};
  transition: all .2s linear;  
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
