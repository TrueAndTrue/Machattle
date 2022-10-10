let BASE_URL : string;
process.env.NODE_ENV ==  'production' ?
  BASE_URL = 'https://machattle.herokuapp.com/api' :
  BASE_URL = 'http://localhost:3030/api'


export const getUserByUsername = async (username :string) => {
  try {
    const response = await fetch(`${BASE_URL}/user` , {
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

export const addFriend = async (uid : string , friendUID :string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${uid}/addFriend` , {
      headers: {
        'Content-Type': 'application/json',
        method :'PUT',
        body : JSON.stringify({uid , friendUID})
      }
    })
  } catch (e) {
    console.log(e)
  }
}

export const addExercise = async (uid :string, questionId : number) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${uid}/addExercise` , {
      headers: {
        'Content-Type': 'application/json',
        method :'PUT',
        body : JSON.stringify({questionId})
      }
    })
  } catch (e) {
    console.log(e)
  }
}

export const getUserExercises = async (uid :string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${uid}/exercises` , {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e)
  }
}

export const getUserChallenges = async (uid :string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/${uid}/challenges` , {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e)
  }
}