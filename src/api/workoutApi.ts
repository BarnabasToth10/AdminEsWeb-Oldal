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

export const createWorkout = async (type: string, exercises: Exercise[]) => {
  const transformedExercises = exercises.map((ex, index) => ({
    exercise_number: ex.exercise_number || 0,
    note: ex.note || `Gyakorlat`,
    reps: ex.reps,
    sets: ex.sets,
  }));

  const response = await fetch(`http://localhost:8080/workouts/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transformedExercises),
  });

  if (!response.ok) {
    const errorText = await response.text(); // így mindig elkapjuk a hibát szövegként is
    throw new Error(`API hiba: ${response.status} ${errorText}`);
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  } else {
    return { message: "Mentés sikeres, de nincs válasz adat." };
  }
};
