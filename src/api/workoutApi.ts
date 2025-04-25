const BASE_URL = 'http://localhost:8080/workouts';

export interface Exercise {
  exercise_number?: number; // Generálja a szerver, ha nincs megadva
  name?: string;  // Kötelező, ha nincs note
  note?: string;  // Kötelező, ha nincs name
  reps: number;
  sets: number;
  duration?: number; // Ha a szerver ezt használja
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
  try {
    const response = await fetch(`${BASE_URL}/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercises),
    });

    // Hibakezelés minden esetre
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP hiba! Státusz: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API hiba:", error);
    throw error; // Propagáljuk a hibát a komponens felé
  }
};