import { useState } from 'react';
import { deleteWorkoutType, deleteSingleWorkout } from '../api/workoutApi';

const WorkoutDeleter: React.FC = () => {
  const [type, setType] = useState<string>('');
  const [exerciseId, setExerciseId] = useState<string>('');

  const handleDeleteType = async () => {
    if (!type.trim()) {
      alert('Workout típus megadása kötelező!');
      return;
    }
    await deleteWorkoutType(type);
    alert(`Workout típus törölve: ${type}`);
    setType('');
  };

  const handleDeleteExercise = async () => {
    if (!type.trim() || !exerciseId.trim()) {
      alert('Típus és Exercise ID megadása kötelező!');
      return;
    }
    await deleteSingleWorkout(type, exerciseId);
    alert(`Gyakorlat törölve: ID ${exerciseId} a ${type} típusból`);
    setExerciseId('');
  };

  return (
    <form className="space-y-6">
      <div className="mx-auto w-[400px] space-y-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Workout típus</label>
          <input
            className="block w-full max-w-md px-4 py-2 border border-gray-300 rounded-md mx-auto"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Pl: muscle_advanced_dumbell"
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleDeleteType}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
          >
            🧨 Teljes típus törlése
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exercise ID</label>
          <input
            className="block w-full max-w-md px-4 py-2 border border-gray-300 rounded-md mx-auto"
            value={exerciseId}
            onChange={(e) => setExerciseId(e.target.value)}
            placeholder="Pl: 2"
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleDeleteExercise}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded shadow"
          >
            ❌ Egy gyakorlat törlése
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkoutDeleter;
