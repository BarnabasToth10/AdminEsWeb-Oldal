import { useState } from 'react';
import { updateWorkouts } from '../api/workoutApi';

interface Exercise {
  note: string;
  reps: number;
  sets: number;
}

const WorkoutEditor: React.FC = () => {
  const [type, setType] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    { note: '', reps: 0, sets: 0 }
  ]);

  const handleChange = <T extends keyof Exercise>(
    index: number,
    field: T,
    value: Exercise[T]
  ) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const handleAdd = () => {
    setExercises([...exercises, { note: '', reps: 0, sets: 0 }]);
  };

  const handleRemove = (index: number) => {
    const updated = exercises.filter((_, i) => i !== index);
    setExercises(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateWorkouts(type, exercises);
    alert('Sikeresen frissítve!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <div className="mx-auto w-[400px] space-y-4">
        {/* Workout típus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workout típus
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Pl: muscle_advanced_dumbell"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        {/* Gyakorlatok listája */}
        {exercises.map((ex, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:text-red-800 px-2 py-1"
              >
                ❌
              </button>
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="Megjegyzés"
                value={ex.note}
                onChange={(e) => handleChange(index, 'note', e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <input
                type="number"
                className="w-1/2 px-3 py-2 border rounded"
                placeholder="Ismétlés (Reps)"
                value={ex.reps}
                onChange={(e) =>
                  handleChange(index, 'reps', Number(e.target.value))
                }
              />
              <input
                type="number"
                className="w-1/2 px-3 py-2 border rounded"
                placeholder="Sorozat (Sets)"
                value={ex.sets}
                onChange={(e) =>
                  handleChange(index, 'sets', Number(e.target.value))
                }
              />
            </div>
          </div>
        ))}

        {/* Gombok */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            ➕ Új gyakorlat
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            🔁 Frissítés
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkoutEditor;
