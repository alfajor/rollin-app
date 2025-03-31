import { useState, useEffect } from 'react';
import { getJsonData, getTestJsonData } from "../../utils/fetch-data";
import { useMapContext } from './map/map-context';
import styled from 'styled-components';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [queryResults, setQueryResults] = useState([]);
    const [apiData, setApiData] = useState([]);

    const { map } = useMapContext()

    const renderApiJson = async () => {
        //const geoJson = await getJsonData(); // API data 
        const geoJson = await getTestJsonData(); // test local data
        setApiData(geoJson.academies) // test data: geoJson.academies / api data: geojson
    }

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
            const filteredResults = apiData.filter((item) => {
                return Object.values(item.properties).join(', ').toLowerCase().includes(searchQuery.toLowerCase())
            });
            setQueryResults(filteredResults);  
        }
    }  
    // fly to search results on map
    const zoomToResults = (item) => {
        if (map) {
            map.target.flyTo(item.geometry.mapCoordinates, 13)
        }
    }

    useEffect(() => {
        renderApiJson()
    }, [searchQuery])

    return (
        <>
            <SearchInput type="text" placeholder='Search by name, city, or state' onChange={searchHandler} onKeyDown={searchHandler} />

            <ResultsContainer>
                {searchQuery.length > 2 ?
                    queryResults.map((item, idx) => {
                        const resultsName = `${item.properties.name}`; 
                        const resultsLocation = `${item.properties.address}. ${item.properties.city}, ${item.properties.stateAbbr}.`;
                        const resultsContact = `${item.properties.website}`;
                        return (
                            <ResultsContent key={idx} onClick={() => zoomToResults(item)}>
                                <h4>{resultsName}</h4>
                                <span>{resultsLocation}</span>
                                <p><a href={`http://${resultsContact}`}>{resultsContact}</a></p>
                            </ResultsContent>
                        )
                    })
                : null }
            </ResultsContainer>
        </>
    )
}

const SearchInput = styled.input`
    border: 1px solid #fff;
    border-radius: 5px;
    background: transparent;
    padding: 12px 6px;
    color: #fff;
    width: 50%;
`;

const ResultsContainer = styled.div`
    margin-top: 20px;
    line-height: 0.6;
`;

const ResultsContent = styled.div`
  cursor: pointer;  
`;

export default Search;