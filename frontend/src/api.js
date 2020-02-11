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
      booktime{
        date
        booked
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

const CreateSathi = `
mutation($file:Upload!,$name:String!,$email:String!,$phone:Int!,$description:String!,
  $duration:String!,$languages:String!,$interests:String!,$location:String!,$lat:String!,
  $lon:String!,$price:Int!)
{createSathi
 (name:$name,
  email :$email,
  phone :$phone,
  description :$description,
  duration :$duration,
  languages :$languages, 
  interests:$interests,
  location :$location, 
  lat : $lat,
  lon : $lon,
  price:$price,
  image:$file)
    { sathi{
      id
            }
    }
  
}"
`
const PickSathiDate=`
mutation($id:Int!,$date:String!){
  pickSathiDate(sathiId:$id,date:$date){
    success
  }
  
}
`
const AddSathiImage=`
mutation($file:Upload!,$id:Int!)
{addSathiImage
  (sathiId:$id,image:$file)
  { success }
}
`

const CreateFood = `
mutation($file:Upload!,$name:String!,$description:String!,
  $location:String!,$lat:String!,$cook: Boolean!
  $lon:String!,$price:Int!)
{createFood
 (name:$name,
  description :$description,
  location :$location, 
  lat : $lat,
  lon : $lon,
  cook:$cook,
  price:$price,
  image:$file)
    { food{
      id
            }
    }
  
}"
`
const PickFoodDate=`
mutation($id:Int!,$date:String!){
  pickFoodDate(foodId:$id,date:$date){
    success
  } 
}
`

const AddFoodImage = `
mutation($file:Upload!,$id:Int!)
{addFoodImage
  (foodId:$id,image:$file)
  { success }
}
`

const CreateEvent = `
mutation($file:Upload!,$name:String!,$description:String!,
  $location:String!,$lat:String!,
  $lon:String!,$price:Int!)
{createFood
 (name:$name,
  description :$description,
  location :$location, 
  lat : $lat,
  lon : $lon,
  price:$price,
  image:$file)
    { event{
      id
            }
    }
  
}"
`
const PickEventDate = `
mutation($id:Int!,$date:String!){
  pickEventDate(eventId:$id,date:$date){
    success
  }
}
`
const AddEventImage=`
mutation($file:Upload!,$id:Int!)
{addEventImage(eventId:$id,image:$file)
  { success }
}
`
const MyBookings=(cat)=>client.request(`
query{
  bookings(cat:${cat})
}
`)

const resource_url = uri+'/resources/'

export {
  get_sathi,get_nearby_sathis, resource_url, get_all_sathis, 
  get_all_events, get_all_foods, check_session, login_user, my_sathis,
  get_me
}