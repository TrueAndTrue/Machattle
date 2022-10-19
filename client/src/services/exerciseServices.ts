let BASE_URL: string;
process.env.NODE_ENV == "production"
  ? (BASE_URL = "https://machattle.herokuapp.com/api")
  : (BASE_URL = "http://localhost:3030/api");

export const getExerciseById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/exercises/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.res;
  } catch (e) {
    console.log(e);
  }
};

export const getRandomExercise = async (difficulty: number, salt: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises/random/${difficulty}$${salt}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.res;
  } catch (e) {
    console.log(e);
  }
};
