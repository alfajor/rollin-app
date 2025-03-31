import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import styled from 'styled-components';

const MapSearch = ({dataList}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuery, setFilteredQuery] = useState([]);

    const map = useMap();

    const searchHandler = (e) => {
        setSearchQuery(e.target.value)
        if(searchQuery) {
            // API data shape
            // const allResultsList = dataList.filter((data) => {
            //     return data.data.map((el) => {
            //         return Object.values(el.properties).join('').toLowerCase().includes(searchQuery.toLowerCase())
            //     });
            // });
            // test data shape
            const allResultsList = dataList.filter((item) => {
                delete item.properties.stateAbbr
                // TODO: limit to city, state, name
                return Object.values(item.properties).join('').toLowerCase().includes(searchQuery.toLowerCase())
            });
            setFilteredQuery(allResultsList);  
        }
    }  

    const renderMapResults = () => {
        // API data shape
        // filteredQuery.map((item) => {  
        //     item.data.map((el) => {
        //         const popupResults = `${el.properties.name}. ${el.properties.city}, ${el.properties.state} \n
        //                           ${el.properties.address}, ${el.properties.website}`; 
        //         setTimeout(() => {
        //             if(searchQuery.length > 2) {
        //                 map.flyTo(el.geometry.mapCoordinates, 10)
        //                 map.openPopup(popupResults, el.geometry.mapCoordinates)
        //             } else {
        //                 map.closePopup()
        //             }
        //         }, 300)   
        //     })
        // });
        // test data shape:
        filteredQuery.map((item) => {    
            const popupResults = `<b>${item.properties.name}</b>. <br /> ${item.properties.address}. <br /> ${item.properties.city},
                                ${item.properties.state}.<br /> <a href=http://${item.properties.website}>${item.properties.website}</a>`;
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
                <StyledInput type="text" placeholder='search the map' onChange={searchHandler} onKeyDown={searchHandler} />
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

export default MapSearch;