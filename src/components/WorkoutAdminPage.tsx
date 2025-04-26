import { useState, useEffect } from 'react'; // FONTOS, kell az useEffect!
import WorkoutForm from './WorkoutForm';
import WorkoutEditor from './WorkoutEditor';
import WorkoutDeleter from './WorkoutDeleter';
import { PuzzlePieceIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const WorkoutAdminPage: React.FC = () => {
  const [message, setSuccessMessage] = useState<string | null>(null);

  // ⬇️ Ez automatikusan eltünteti az üzenetet 3 másodperc múlva
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer); // Cleanup ha új üzenet jön közben
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Globális üzenet */}
      {message && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold z-50 transition-all">
          ✅ {message}
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Edzéstervek Adminisztráció
          </h1>
        </header>

        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Új workout kártya */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-center gap-2">
              <PuzzlePieceIcon className="h-8 w-8 text-emerald-600" />
              <h2 className="text-xl font-semibold text-slate-900">Új Workout</h2>
            </div>

            {/* A form legyen ITT, a címsor alatt, de a section részeként */}
            <WorkoutForm onSuccess={(msg) => setSuccessMessage(msg)} />
          </section>


          {/* Módosítás kártya */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-center gap-2">
              <PencilSquareIcon className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Workout Módosítása</h2>
            </div>
            <WorkoutEditor onSuccess={(message) => setSuccessMessage(message)} />
          </section>

          {/* Törlés kártya */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-center gap-2">
              <TrashIcon className="h-8 w-8 text-rose-600" />
              <h2 className="text-xl font-semibold text-slate-900">Workout Törlése</h2>
            </div>
            <WorkoutDeleter onSuccess={(message) => setSuccessMessage(message)} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkoutAdminPage;
