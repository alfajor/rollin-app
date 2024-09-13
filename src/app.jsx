import Map from './components/map';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <MainContainer>
        <h1>Rollin' Map</h1>
      
        <Map />
      </MainContainer>
    </>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
