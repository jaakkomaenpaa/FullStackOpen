import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const maxNum = anecdotes.length;
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button
        onClick={() => {
          const copy = [...points];
          copy[selected] += 1;
          setPoints(copy);
          console.log(Math.max(...points));
        }}
      >
        vote
      </button>
      <button
        onClick={() => {
          let randomNum = Math.floor(Math.random() * maxNum);
          setSelected(randomNum);
        }}
      >
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p>has {Math.max(...points)} votes</p>
    </div>
  );
};

export default App;
