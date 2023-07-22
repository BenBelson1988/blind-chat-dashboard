import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import RangeSlider from 'rsuite/RangeSlider';

import {FilterStatsDiv, FixedDiv, MapDiv} from "../styled/Divs";
import {H3StatsHeading, H4Blue, H4Pink, H5TopBottom} from "../styled/Heading";
import {DotsButtonInterests} from "../styled/Xbutton";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import GoogleMap from "./GoogleMap/GoogleMap";
import Space from "../styled/Space";
import CitySearch from "./CitySearch";
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {fetchStats} from "../../stores/slices/statsSlicer";
import useQueryParams from "../../customHooks/useQueryParams";

export default (props) => {
    console.log("stats", props);

    useEffect(()=>{
        const q = getQuery()
        dispatch(fetchStats(q))
        history.push({
            search: q,
        });
    },[])
    const dispatch = useDispatch();
    const [query, setQuery] = useState(null)
    const history = useHistory();
    const queryParams = useQueryParams();
    console.log(queryParams)
    const [ageRange, setAgeRange] = useState([20, 37]);

    const [filterState, setFilterState] = useState({
        gender: '',
        ageRange: [
            props.facetsStats.age?.min || (queryParams.ageRange && queryParams.ageRange[0]) || ageRange[0],
            props.facetsStats.age?.max || (queryParams.ageRange && queryParams.ageRange[1]) || ageRange[1]
        ],
        geoLoc: {
            lat: 32.109333,
            lng: 34.855499,
            radius: 20,
        },
        useMap: false,
        city: "",
    });

    const [firstRender, setFirstRender] = useState(true);

    const cityListRef = useRef();


    if (firstRender) {

        cityListRef.current = props.cityList;
    }

    const setRange = ([min, max]) => {
        setFilterState({
            ...filterState,
            ageRange: [min, max],
        })
    };

    // const {search} = useLocation();

    // useEffect(() => {
    //     debugger
    //     const qr = getQuery();
    //     debugger
    //     setQuery(qr)
    //     console.log(qr)
    //     setQuery(qr)
    //     //     debugger
    //     //     //dispatch(fetchStats(search.slice(1)))
    // }, []);
    if (props.facetsStats.length === 0){
        return null;
    }

    const getQuery = () => {

        try {
            const queryParams = []
            const {ageRange, geoLoc, useMap, gender, city, ...rest} = filterState;

            const algolyaQuery = ageRange.map((val, index) => `age${index === 0 ? '>' : '<'}${val}`);

            if (useMap) {
                queryParams.push(`aroundLatLng:${geoLoc.lat},${geoLoc.lng}`);
                queryParams.push(`aroundRadius:${geoLoc.radius}`)
            }

            if (gender) {
                algolyaQuery.push(`gender:${gender}`)
            }
            if (city) {
                algolyaQuery.push(`city:${city}`)
            }
            /////
            // dynamicallyQuery = dynamciallyArr.map((query, index) => {
            //     if (index === 0) return query;
            //     else return " AND " + query;
            // });
            return `?query=${algolyaQuery.join(' AND ')}${(queryParams.length ? '&' : '') + queryParams.join('&')}`;
        } catch (e) {
            console.log(e)
        }
    };

    console.log(filterState)


    const setMapState = (geoLoc) => {
        setFilterState({...filterState, geoLoc});
    };

    const setGender = (gender) => {
        if (filterState.gender == gender) {
            setFilterState({...filterState, gender: ''})
        } else {
            setFilterState({...filterState, gender})

        }
    }


    const locationHandler = () => {
        setFilterState({...filterState, useMap: !filterState.useMap});
    };
    useEffect(() => {
        try{
            const q = getQuery()
            dispatch(fetchStats(q))
            history.push({
                search: q,
            });
        } catch (e){
            console.log(e)
        }

    }, [filterState]);

    return (
        <FixedDiv>
            <H3StatsHeading>Stats Filters</H3StatsHeading>
            <CitySearch
                filterState={filterState}
                setFilterState={setFilterState}
                cityList={cityListRef.current}
            />
            <FilterStatsDiv>
                <input type={"checkbox"} onInput={() => setGender('Male')}/>

                <H4Blue>Male</H4Blue>
                <input type={"checkbox"} onInput={() => setGender('Female')}/>

                <H4Pink>Female</H4Pink>
            </FilterStatsDiv>

            <label id="slider-label">Age</label>
            <Slider range value={ageRange} min={20} max={74}
                    onChange={setAgeRange} onAfterChange={setRange}/>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <div style={{color: 'white'}}>{ageRange[0]}</div>
                <div style={{flex: 1, width: '100%'}}>

                </div>
                <div>{ageRange[1]}</div>
            </div>
            <Space height="20"/>
            <FilterStatsDiv>
                <input type={"checkbox"} onInput={() => locationHandler()}/>

                <H4Blue>Filter by location</H4Blue>
            </FilterStatsDiv>
            <GoogleMap setMapState={setMapState}/>
        </FixedDiv>
    );
};
