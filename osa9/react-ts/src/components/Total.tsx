interface TotalProps {
  parts: CoursePart[]
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}


const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {" "}
      {props.parts.reduce((total, next) => total + next.exerciseCount, 0)}
    </p>
  )
};

export default Total;