// src/components/WorkoutAdminPage.tsx
import WorkoutForm from './WorkoutForm';
import WorkoutEditor from './WorkoutEditor';
import WorkoutDeleter from './WorkoutDeleter';

const WorkoutAdminPage: React.FC = () => {
  return (
<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-6 py-16 ">
  <div className="max-w-7xl mx-auto space-y-16">
    <header className="text-center space-y-2">
      <h1 className="text-4xl font-bold text-indigo-800">🛠️ Workout Admin Panel</h1>
      <p className="text-lg text-gray-600">
        Kezeld az edzésterveket, gyakorlatokat – frissítsd, töröld vagy adj hozzá újat.
      </p>
    </header>

    {/* Itt jönnek a form panelek egyenként középre húzva */}
    <div className="flex flex-col items-center space-y-12 bg-slate-100 py-10 ">
      {/* Új workout */}
      <section className="w-full max-w-[800px] bg-white border border-gray-300 shadow-md rounded-xl px-8 py-10 my-8">
        <h2 className="text-xl font-semibold text-indigo-600 text-center mb-4">➕ Új Workout</h2>
        <WorkoutForm />
      </section>

      {/* Módosítás */}
      <section className="w-full max-w-[800px] bg-white border border-gray-300 shadow-md rounded-xl px-8 py-10">
        <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">🔁 Workout módosítása</h2>
        <WorkoutEditor />
      </section>

      {/* Törlés */}
      <section className="w-full max-w-[800px] bg-white border-2 border-gray-300 shadow-md rounded-xl px-8 py-10">
        <h2 className="text-xl font-semibold text-red-600 text-center mb-4">🗑️ Workout törlése</h2>
        <WorkoutDeleter />
      </section>
    </div>
  </div>
</div>


  );
};

export default WorkoutAdminPage;
