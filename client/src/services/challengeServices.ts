let BASE_URL : string;
process.env.NODE_ENV ==  'production' ?
  BASE_URL = 'https://machattle.herokuapp.com/api' :
  BASE_URL = 'http://localhost:3030/api'


export const getChallengeById = async (id :string) => {
  try {
    const response = await fetch(`${BASE_URL}/challenge/${id}` , {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}

export const getRecentChallenges = async () => {
  try {
    const response = await fetch(`${BASE_URL}/challenges` , {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}