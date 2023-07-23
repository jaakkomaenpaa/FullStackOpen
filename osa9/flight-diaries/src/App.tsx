import {useState, useEffect} from 'react';
import diaryService from './services/diaries';
import { DiaryEntry } from './types';
import Diary from './components/Diary';
import DiaryForm from './components/DiaryForm';

const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const getData = async () => {
      const diaryData = await diaryService.getAll()
      setDiaries(diaryData)
      console.log(diaries)
    }
    getData()
  }, [])

  return (
    <div>
      <DiaryForm />
      <h3>Diary entries</h3>
      {diaries.map(diary => 
        <Diary key={diary.date} diary={diary}/>
      )}
    </div>
  )
}

export default App;
