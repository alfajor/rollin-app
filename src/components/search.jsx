import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import styled from 'styled-components';

const Search = ({dataList}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuery, setFilteredQuery] = useState([])

    const map = useMap();

    const searchHandler = (e) => {
        setSearchQuery(e.target.value)
        if(searchQuery) {
            const allResultsList = dataList.filter((item) => {
                delete item.properties.stateAbbr
                // TODO: limit to city, state, name
                return Object.values(item.properties).join('').toLowerCase().includes(searchQuery.toLowerCase())
            });
            setFilteredQuery(allResultsList);  
        }
    }  

    const renderMapResults = () => {
        filteredQuery.map((item) => {
            const popupResults = `${item.properties.name}. ${item.properties.city}, ${item.properties.state} \n
                                  ${item.properties.address}, ${item.properties.website}`; 
            setTimeout(() => {
                if(searchQuery.length > 2) {
                    map.flyTo(item.geometry.mapCoordinates, 10)
                    map.openPopup(popupResults, item.geometry.mapCoordinates)
                } else {
                    map.closePopup()
                }
            }, 300)    
        });
    }

    useEffect(() => {
        renderMapResults()
    }, [searchQuery])

    return (
        <>
            <SearchContainer>
                <StyledInput type="text" placeholder='search' onChange={searchHandler} onKeyDown={searchHandler} />
            </SearchContainer>
        </>
    );
}

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: end;
    margin-top: 30px;
    margin-right: 15px;
    z-index: 9999;

    ::placeholder {
        color: #222;
    }
`;

const StyledInput = styled.input`
    border: 1px solid #222;
    border-radius: 5px;
    background: transparent;
    padding: 8px 5px;
    color: #222;
`;

export default Search;