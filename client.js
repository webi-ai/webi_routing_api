import {
    gql,
    sudograph
} from 'sudograph';

const {
    query,
    mutation
} = sudograph({
    canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai'
});

import { Identity } from '@dfinity/agent';

export type Options = Readonly<{
    canisterId: string;
    identity?: Identity;
    queryFunctionName?: string;
    mutationFunctionName?: string;
}>;

// query
// query for city ids
async function getCityIds() {
    const result = await query(gql`
        query {readCity { id city }}
    `);

    const cities = result.data.readCity;

    return cities;
}


//query state IDs
async function getStateIds() {
    const result = await query(gql`
        query {readState { id name }}
    `);

    const states = result.data.readState;

    return states;
}


//query country IDs
async function getCountryIds() {
    const result = await query(gql`
        query {readCountry { id country }}
    `);

    const countries = result.data.readCountry;

    return countries;
}

//query continent IDs
async function getContinentIds() {
    const result = await query(gql`
        query {readContinent { id name }}
    `);

    const continents = result.data.readContinent;

    return continents;
}


//query url IDs
async function getURLIds() {
    const result = await query(gql`
        query {readURL { id url map_asset_url}}
    `);

    const urls = result.data.readURL;

    return urls;




// create URL mutation
async function createURL(url,map_asset_url) {
    const result = await mutation(gql`
        mutation ($url: String!,$map_asset_url: String!) {
  createURL(
    input: {url: $url, map_asset_url: $map_asset_url}
  ) {
    id
  }
}
    `, {
        url,map_asset_url
    });

    const url_id = result.data.createURL;

    return url_id;
}



// create city mutation

async function createCity(url_id,city) {
    const result = await mutation(gql`
        mutation ($url_id: String!,$city: String!)  {
  createCity(
    input: {city: $city, map_location_url: {connect:$url_id}}
  ) {
    id
  }
}
    `, {
        url_id,city
    });

    const city_id = result.data.createCity;

    return city_id;
}

// create state mutation

async function createState(url_id,state) {
    const result = await mutation(gql`
        mutation ($url_id: String!,$state: String!)  {
  createState(
    input: {name: $state, map_location_url: {connect:$url_id}}
  ) {
    id
  }
}
    `, {
        url_id,state
    });

    const state_id = result.data.createState;

    return state_id;
}

// create Country mutation

async function createCountry(url_id,country) {
    const result = await mutation(gql`
        mutation ($url_id: String!,$country: String!)  {
  createCountry(
    input: {country: $country, map_location_url: {connect:$url_id}}
  ) {
    id
  }
}
    `, {
        url_id,country
    });

    const country_id = result.data.createCountry;

    return country_id;
}



// create Continent mutation

async function createContinent(url_id,continent) {
    const result = await mutation(gql`
        mutation ($url_id: String!,$continent: String!)  {
  createContinent(
    input: {name: $continent, map_location_url: {connect:$url_id}}
  ) {
    id
  }
}
    `, {
        url_id,continent
    });

    const continent_id = result.data.createContinent;

    return continent_id;
}


