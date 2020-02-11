import { client } from "Route"

const uri = 'http://localhost:8000'

const get_nearby_sathis =  (lat, lng, limit=50) => client.request(`query {
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
  }`)

const get_sathi = (id) => client.request(`
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
  `)
const get_all_sathis = () => client.request(`
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
  `)

const get_all_events = () => client.request(`

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
`)

const get_all_foods = () => client.request(`
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
)

const check_session = (token) => client.request(`
    mutation {
        verifyToken(token:"${token}"){
        payload
    }
    }
`)

const login_user = (username, password) => client.request(`mutation {
	tokenAuth(username:"${username}", password:"${password}") {
	  token
	}
}`)

const my_sathis = () => client.request(`query {
  mySathis {
    id
    approved
  }
}`)

const get_me = () => client.request(`query{
  me {
    id
    firstName
    lastName
    email
  }
}`)


const resource_url = uri+'/resources/'

export {
  get_sathi,get_nearby_sathis, resource_url, get_all_sathis, 
  get_all_events, get_all_foods, check_session, login_user, my_sathis,
  get_me
}