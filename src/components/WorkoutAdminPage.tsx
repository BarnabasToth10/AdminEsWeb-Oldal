// src/components/WorkoutAdminPage.tsx
import WorkoutForm from './WorkoutForm';
import WorkoutEditor from './WorkoutEditor';
import WorkoutDeleter from './WorkoutDeleter';
import { PuzzlePieceIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const WorkoutAdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Fejléc rész */}
        <header className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Edzéstervek Adminisztráció
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Kezelje az edzésterveket egyszerűen és hatékonyan - hozzáadás, módosítás vagy törlés
          </p>
        </header>

        {/* Fő tartalom rész */}
        <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Új workout kártya */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center justify-center gap-2">
              <PuzzlePieceIcon className="h-8 w-8 text-emerald-600" />
              <h2 className="text-xl font-semibold text-slate-900">Új Workout</h2>
            </div>
            <WorkoutForm />
          </section>

          {/* Módosítás kártya */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center justify-center gap-2">
              <PencilSquareIcon className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold text-slate-900">Workout Módosítása</h2>
            </div>
            <WorkoutEditor />
          </section>

          {/* Törlés kártya */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center justify-center gap-2">
              <TrashIcon className="h-8 w-8 text-rose-600" />
              <h2 className="text-xl font-semibold text-slate-900">Workout Törlése</h2>
            </div>
            <WorkoutDeleter />
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkoutAdminPage;