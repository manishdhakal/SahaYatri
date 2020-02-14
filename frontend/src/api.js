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
        duration
        photos {
            image
            id
            
        }
    }
  }`)

const get_sathi = (id) => client.request(`
    query {
        sathi(id:${id}) {
        approved
        id
        name
        languages
        interests
        duration
        lat
        lon
        location
        email
        phone
        price
        description
        booktime {
          id
          date
        }
        photos {
            id
            image
          }
        }
    }
  `)
const get_food = (id) => client.request(`query{
  food(id:${id}) {
    id
    name
    description
    cook
    lon
    lat
    price
    location
    user {
      id
      firstName
      lastName
    }
    booktime {
      id
      date
    }
    photos {
      id
      image
    }
  }
}`)

const get_event = (id) => client.request(`query{
  event(id:${id}) {
    id
    name
    lon
    lat
    location
    description
    price
    user {
      id
      firstName
      lastName
    }
    
    booktime {
      id
      date
    }
    
    photos {
      id
      image
    }
    
  }
}`)

const get_all_sathis = () => client.request(`
  query {
      allSathis{
      name
      id
      description
      price
      booktime {
        date
    	  id
    	}
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

const book = (category, categoryId, timeId) => client.request(`mutation{
  bookData(category:${category}, categoryId:${categoryId}, timeId:${timeId}){
    bookData{
      id
    }
  }
}`)

const bookings = (cat) => client.request(`query{
  bookings(cat:${cat})
}
`)

const create_event =  (name, desc, location, lat,lon,price) => client.request( `mutation{
  createEvent(name:"${name}", description :"${desc}",location :"${location}", lat : ${lat}, lon : ${lon}, price:${price}){
    event {
      id
    }
  }
}`
)

const create_food = (name, desc, cook, location,lat, lon, price) => client.request(`mutation{
  createFood(name:"${name}", description :"${desc}",cook:${cook},location :"${location}", lat : ${lat}, lon : ${lon}, price:${price}){
    food {
      id
    }
  }
}
`)

const resource_url = uri+'/resources/'

export {
  get_sathi,get_nearby_sathis, resource_url, get_all_sathis, 
  get_all_events, get_all_foods, check_session, login_user, my_sathis,
  get_me, get_food, get_event, book, bookings, uri, create_event, create_food
}