const BASE_URL = 'http://localhost:8080/workouts';

export interface Exercise {
  note: string;
  reps: number;
  sets: number;
}

export const addWorkouts = async (
  type: string,
  exercises: Exercise[]
): Promise<Response> => {
  return fetch(`${BASE_URL}/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercises),
  });
};

export const updateWorkouts = async (
  type: string,
  exercises: Exercise[]
): Promise<Response> => {
  return fetch(`${BASE_URL}/${type}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exercises),
  });
};

export const deleteWorkoutType = async (
  type: string
): Promise<Response> => {
  return fetch(`${BASE_URL}/${type}`, {
    method: 'DELETE',
  });
};

export const deleteSingleWorkout = async (
  type: string,
  exerciseId: string
): Promise<Response> => {
  return fetch(`${BASE_URL}/${type}/${exerciseId}`, {
    method: 'DELETE',
  });
};

export const createWorkout = async (type: string, exercises: any[]) => {
  const response = await fetch(`/workouts/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exercises)
  });
  return response.json();
};
