export const Header = ({ name }) => <h1>{name}</h1>;

const SubHeader = ({ name }) => <h2>{name}</h2>;

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const sum = props.parts.reduce((total, current) => {
    return total + current.exercises;
  }, 0);

  return (
    <div>
      <p>
        <strong>total of {sum} exercises</strong>
      </p>
    </div>
  );
};

export const Course = ({ course }) => {
  return (
    <div>
      <SubHeader name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
