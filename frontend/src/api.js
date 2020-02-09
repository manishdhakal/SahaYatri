import { createApolloFetch } from "apollo-fetch";

const fetch = createApolloFetch({uri:'http://localhost:8000/graphql/'})

const get_nearby_sathis =  (lat, lng, limit=100) => fetch({query:`query {
    nearbySathis(lat:${lat}, lon:${lng}, limit:${limit} ) {
        name
        id
        description
        lat
        lon
        photos {
            image
            id
            
        }
    }
  }`})
  const resources_api = 'http://localhost:8000/resources/'

  export {get_nearby_sathis, resources_api}