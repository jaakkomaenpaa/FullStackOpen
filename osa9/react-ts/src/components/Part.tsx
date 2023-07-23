import { CoursePart } from "../interfaces";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong> <br/>
          <i>{part.description}</i> <br/> <br/>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong> <br/>
          project exercises {part.groupProjectCount} <br/> <br/>
        </div>
      );
    case "background":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong> <br/>
          <i>{part.description}</i> <br/>
          submit to {part.backgroundMaterial} <br/> <br/>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong> <br/>
          <i>{part.description}</i> <br/>
          required skills: {part.requirements.join(', ')} <br/> <br/>
        </div>
      )
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default Part;