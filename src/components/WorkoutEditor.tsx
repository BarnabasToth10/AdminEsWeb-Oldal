import { useState } from 'react';
import { updateWorkouts } from '../api/workoutApi';
import { PlusCircleIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface WorkoutEditorProps {
  onSuccess: (message: string) => void;
}

interface Exercise {
  note: string;
  reps: number;
  sets: number;
}

const WorkoutEditor: React.FC<WorkoutEditorProps> = ({ onSuccess }) => {
  const [type, setType] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([{ note: '', reps: 0, sets: 0 }]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(`/workouts/${type}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercises),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Hiba: ${response.status} ${text}`);
      }

      await response.json();
      onSuccess("✅ Sikeresen frissítve!");
      setType('');
      setExercises([{ note: '', reps: 0, sets: 0 }]);

    } catch (err: any) {
      onSuccess(`❌ Hiba: ${err.message ?? 'Ismeretlen hiba'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="mx-auto max-w-md space-y-6">

        {/* Workout Type Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Workout típus
            <span className="text-blue-500 ml-1">*</span>
          </label>
          <input
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Pl: muscle_advanced_dumbell"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {exercises.map((ex, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-500">Gyakorlat #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Megjegyzés</label>
                  <input
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                    placeholder="Gyakorlat leírása"
                    value={ex.note}
                    onChange={(e) => handleChange(index, 'note', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Ismétlés</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                      placeholder="Reps"
                      value={ex.reps === 0 ? '' : ex.reps}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        handleChange(index, 'reps', isNaN(value) ? 0 : value);
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Sorozat</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500"
                      placeholder="Sets"
                      value={ex.sets === 0 ? '' : ex.sets}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        handleChange(index, 'sets', isNaN(value) ? 0 : value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition-all"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>Új gyakorlat</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>Frissítés</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkoutEditor;
