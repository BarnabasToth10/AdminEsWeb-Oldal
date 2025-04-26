import { useState } from 'react';
import { deleteWorkoutType, deleteSingleWorkout } from '../api/workoutApi';
import { TrashIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface WorkoutDeleterProps {
  onSuccess: (message: string) => void;
}

const WorkoutDeleter: React.FC<WorkoutDeleterProps> = ({ onSuccess }) => {
  const [type, setType] = useState('');
  const [exerciseId, setExerciseId] = useState('');

  const handleDeleteType = async () => {
    if (!type.trim()) {
      onSuccess('❌ Workout típus megadása kötelező!');
      return;
    }
    try {
      await deleteWorkoutType(type);
      onSuccess(`✅ Workout típus törölve: ${type}`);
      setType('');
    } catch (err: any) {
      onSuccess(`❌ Hiba: ${err.message ?? 'Ismeretlen hiba'}`);
    }
  };

  const handleDeleteExercise = async () => {
    if (!type.trim() || !exerciseId.trim()) {
      onSuccess('❌ Típus és Exercise ID megadása kötelező!');
      return;
    }
    try {
      await deleteSingleWorkout(type, exerciseId);
      onSuccess(`✅ Gyakorlat törölve: ID ${exerciseId} a ${type} típusból`);
      setExerciseId('');
    } catch (err: any) {
      onSuccess(`❌ Hiba: ${err.message ?? 'Ismeretlen hiba'}`);
    }
  };

  return (
    <form className="space-y-6">
      <div className="mx-auto max-w-md space-y-6">
        {/* Workout Type Delete Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Workout típus
              <span className="text-rose-500 ml-1">*</span>
            </label>
            <input
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Pl: muscle_advanced_dumbell"
            />
          </div>

          <button
            type="button"
            onClick={handleDeleteType}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            <TrashIcon className="w-5 h-5" />
            <span>Teljes típus törlése</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm text-slate-500">VAGY</span>
          </div>
        </div>

        {/* Single Exercise Delete Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Exercise Number
              <span className="text-rose-500 ml-1">*</span>
            </label>
            <input
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
              placeholder="Pl: 2"
            />
          </div>

          <button
            type="button"
            onClick={handleDeleteExercise}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            <XCircleIcon className="w-5 h-5" />
            <span>Egy gyakorlat törlése</span>
          </button>
        </div>

        {/* Warning */}
        <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-lg border border-rose-100">
          <ExclamationTriangleIcon className="w-6 h-6 text-rose-600 flex-shrink-0" />
          <p className="text-sm text-rose-700">
            Figyelem! A törlések nem vonhatók vissza. Kérjük ellenőrizze a bevitt adatokat!
          </p>
        </div>
      </div>
    </form>
  );
};

export default WorkoutDeleter;
