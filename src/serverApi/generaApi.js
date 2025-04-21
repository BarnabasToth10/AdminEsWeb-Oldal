import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 8080;
app.use(express.json()); // 💡 Fontos a POST, PUT és PATCH kérésekhez
app.use(cors());
// 🔁 Betölti a teljes JSON-t memóriába
const workouts = JSON.parse(fs.readFileSync('../utils/workout_presets_full.json', 'utf8'));

// 📥 GET - Összes edzéstípus lekérése
app.get('/workouts', (req, res) => {
  res.status(200).json(workouts);
});

// 📥 GET - Egy adott edzéstípus lekérése
app.get('/workouts/:type', (req, res) => {
  const { type } = req.params;
  const data = workouts[type];
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});
// ➕ POST - Új edzéstípus létrehozása, üres listával
app.post('/workouts/:type', (req, res) => {
  const { type } = req.params;
  const newExercises = req.body;

  // Ha nincs ilyen típus, létrehozzuk
  if (!workouts[type]) {
    workouts[type] = [];

    // Ha nincs body vagy üres, akkor csak létrehozzuk és visszatérünk
    if (!newExercises || (Array.isArray(newExercises) && newExercises.length === 0)) {
      fs.writeFileSync('../utils/workout_presets_full.json', JSON.stringify(workouts, null, 2));
      return res.status(201).json({ message: `Workout type '${type}' created` });
    }
  }

  // Ha nem tömb, hibát dobunk
  if (!Array.isArray(newExercises)) {
    return res.status(400).json({ error: 'Body must be an array of exercises' });
  }

  const existingExercises = workouts[type];
  const existingNumbers = new Set(
    existingExercises.map(e => e.exercise_number).filter(n => typeof n === 'number')
  );
  const existingNames = new Set(
    existingExercises.map(e => (e.name || e.note || '').toLowerCase())
  );

  const validExercises = [];
  let nextNumber = existingExercises.reduce((max, ex) =>
    typeof ex.exercise_number === 'number' && ex.exercise_number > max ? ex.exercise_number : max, 0);

  for (const ex of newExercises) {
    const nameKey = (ex.name || ex.note || '').toLowerCase();
    if (existingNames.has(nameKey)) continue;
    if (typeof ex.exercise_number === 'number' && existingNumbers.has(ex.exercise_number)) continue;

    if (typeof ex.exercise_number !== 'number') {
      nextNumber++;
      ex.exercise_number = nextNumber;
    }

    validExercises.push(ex);
    existingNames.add(nameKey);
    existingNumbers.add(ex.exercise_number);
  }

  if (validExercises.length === 0) {
    return res.status(409).json({ error: 'All exercises already exist or had duplicate numbers' });
  }

  workouts[type].push(...validExercises);
  fs.writeFileSync('../utils/workout_presets_full.json', JSON.stringify(workouts, null, 2));

  res.status(201).json({ message: `${validExercises.length} exercise(s) added`, type });
});    

// 🗑️ DELETE - Teljes edzéstípus törlése
app.delete('/workouts/:type', (req, res) => {
  const { type } = req.params;

  if (!workouts[type]) {
    return res.status(404).json({ error: 'Workout type not found' });
  }

  delete workouts[type];
  fs.writeFileSync('../utils/workout_presets_full.json', JSON.stringify(workouts, null, 2));

  res.status(200).json({ message: `Workout type '${type}' deleted` });
});

// 🗑️ DELETE - Egy adott gyakorlat törlése egy típusból (exercise_number alapján)
app.delete('/workouts/:type/:exercise_number', (req, res) => {
  const { type, exercise_number } = req.params;

  if (!workouts[type]) return res.status(404).json({ error: 'Workout type not found' });

  const initialLength = workouts[type].length;
  workouts[type] = workouts[type].filter(e => e.exercise_number != exercise_number);

  if (workouts[type].length === initialLength) {
    return res.status(404).json({ error: 'Exercise not found' });
  }

  fs.writeFileSync('../utils/workout_presets_full.json', JSON.stringify(workouts, null, 2));
  res.status(200).json({ message: 'Exercise deleted' });
});

// 🔧 PATCH - Egy adott gyakorlat részleges frissítése
app.patch('/workouts/:type/:exercise_number', (req, res) => {
    const { type, exercise_number } = req.params;
    const updatedData = req.body;
    
    console.log("Updated data:", updatedData); // Logoljuk a frissítést
    
    if (!workouts[type]) return res.status(404).json({ error: 'Workout type not found' });
    
    const index = workouts[type].findIndex(e => e.exercise_number == exercise_number);
    if (index === -1) return res.status(404).json({ error: 'Exercise not found' });
    
    const currentExercise = workouts[type][index];
    console.log("Current exercise:", currentExercise); // Logoljuk a meglévő gyakorlatot
    
    const updatedExercise = { ...currentExercise };
    console.log("Updated ex: ",updatedExercise)
    for (const key of Object.keys(updatedData)) {
      if (currentExercise.hasOwnProperty(key)) {
        updatedExercise[key] = updatedData[key];
      }
    }
    
    workouts[type][index] = updatedExercise;
    
    // Mentés és válasz
    fs.writeFileSync('../utils/workout_presets_full.json', JSON.stringify(workouts, null, 2));
    res.status(200).json({ message: 'Exercise updated' });
  });  
// 🔁 PUT - Egy edzéstípus teljes lecserélése
app.put('/workouts/:type', (req, res) => {
  const { type } = req.params;
  const updatedExercises = req.body;

  if (!Array.isArray(updatedExercises)) {
    return res.status(400).json({ error: 'Body must be an array of exercises' });
  }

  if (!workouts[type]) {
    return res.status(404).json({ error: 'Workout type not found' });
  }

  workouts[type] = updatedExercises;
  fs.writeFileSync('../utils/workout_presets_full.json', JSON.stringify(workouts, null, 2));

  res.status(200).json({ message: 'Workout type updated', type });
});

// 🚀 Szerver indítása
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
