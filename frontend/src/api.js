import { createApolloFetch } from "apollo-fetch";

import cookie from 'react-cookies'
const ngrok_uri = 'http://localhost:8000'
const fetch = createApolloFetch({uri:ngrok_uri+'/graphql/'})



// fetch.use(({ request, options }) => {
//   if (!options.headers) {
//     options.headers = {};  // Create the headers object if needed.
//   }
//   options.headers['authorization'] = cookie.load('token');

//   // next();
// });

const get_nearby_sathis =  (lat, lng, limit=50) => fetch({ query:`query {
    nearbySathis(lat:${lat}, lon:${lng}, limit:${limit} ) {
        name
        id
        description
        lat
        lon
        price
        photos {
            image
            id
            
        }
    }
  }`})

const get_sathi = (id) => fetch({query:`
    query {
        sathi(id:${id}) {
        id
        name
        languages
        interests
        lat
        lon
        location
        email
        phone
        price
        description
        photos {
            id
            image
          }
        }
    }
  `

  })
const get_all_sathis = () => fetch({query:`
  query {
      allSathis{
      name
      id
      description
      price
      photos {
        id
        image
      }
      
    }
  }
  `
})
const get_all_events = () => fetch({query:`

    query {
        allEvents{
        price
        description
        location
        lon
        lat
        name
        id
        photos {
        id
        image
        }
    }
    }
`})

const get_all_foods = () => fetch({query:`
    query {
        allFoods{
        id
        name
        description
        location
        lat
        lon
        price
        photos {
        id
        image
        }
    }
    }`
})

const check_session = (token) => fetch({query:`
    mutation {
        verifyToken(token:"${token}"){
        payload
    }
    }
`})

const login_user = (username, password) => fetch({query:`mutation {
	tokenAuth(username:"${username}", password:"${password}") {
	  token
	}
}`})

const my_sathis = () => fetch({query:`query {
  mySathis {
    id
  }
}`})
const resource_url = ngrok_uri+'/resources/'

export {get_sathi,get_nearby_sathis, resource_url, get_all_sathis, get_all_events, get_all_foods, check_session, login_user, my_sathis}