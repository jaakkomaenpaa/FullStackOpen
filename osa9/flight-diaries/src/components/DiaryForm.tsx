import { useState } from 'react';
import diaryService from '../services/diaries';
import axios from 'axios';

const DiaryForm = () => {

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const weatherTypes = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
  const visibilityTypes = ['great', 'good', 'ok', 'poor'];

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newDiaryEntry = {
      date, visibility, weather, comment
    }
    console.log(date, visibility, weather, comment)
    try {
      await diaryService.create(newDiaryEntry);
      reset()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.replace('Something went wrong. ', '').slice(0, -2)
        setError(message)
      } else {
        console.error(error)
      }
    }
  }
  
  const reset = () => {
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <div>
      <h3>Add new entry</h3>
      <p style={{ color: 'red' }}>{error}</p>
      <form onSubmit={submit}>
        date<input type='date' value={date} onChange={((event) => setDate(event.target.value))}/> <br/>
        visibility {visibilityTypes.map(item => 
          <span key={item}>
            {item}
            <input type='radio' name='visibility' value={item} onChange={((event) => setVisibility(event?.target.value))}/> 
          </span>
          )} <br/>
        weather {weatherTypes.map(item => 
          <span key={item}>
            {item}
            <input type='radio' name='weather' value={item} onChange={((event) => setWeather(event.target.value))}/>
          </span> 
          )} <br/>
        comment<input type='text' value={comment} onChange={((event) => setComment(event.target.value))}/> <br/>
        <button type='submit'>add</button>
      </form>
      
    </div>
  )
};

export default DiaryForm;