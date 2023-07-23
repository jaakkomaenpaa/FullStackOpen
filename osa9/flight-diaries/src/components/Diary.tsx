import { DiaryEntry } from "../types";

interface DiaryProps {
  diary: DiaryEntry
}

const Diary = ({ diary }: DiaryProps) => {

  return (
    <div>
      <p><strong>{diary.date} </strong></p>
      visibility: {diary.visibility} <br/>
      weather: {diary.weather}
    </div>
  )
};

export default Diary;