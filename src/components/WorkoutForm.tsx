import { useState } from 'react';
import { createWorkout } from '../api/workoutApi';
import { CheckIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Exercise {
  note: string;
  reps: number;
  sets: number;
}

const WorkoutForm: React.FC = () => {
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
    await createWorkout(type, exercises);
    alert('Sikeresen mentve!');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto max-w-md space-y-6">
        {/* Workout Type Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Workout típus
            <span className="text-emerald-500 ml-1">*</span>
          </label>
          <input
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                    placeholder="Gyakorlat leírása"
                    value={ex.note}
                    onChange={(e) => handleChange(index, 'note', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Ismétlés</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                      placeholder="Reps"
                      value={ex.reps}
                      onChange={(e) => handleChange(index, 'reps', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Sorozat</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                      placeholder="Sets"
                      value={ex.sets}
                      onChange={(e) => handleChange(index, 'sets', Number(e.target.value))}
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
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg transition-all"
          >
            <CheckIcon className="w-5 h-5" />
            <span>Mentés</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkoutForm;