import {assertNever, CoursePart} from '../types';

interface IPart {
  part: CoursePart;
}

const Part = ({part}: IPart) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p> Exercises: {part.exerciseCount}</p>
          <p>type: {part.type}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h2>{part.name}</h2>
          <p> Exercises: {part.exerciseCount}</p>
          <p> Group projects: {part.groupProjectCount}</p>
          <p>type: {part.type}</p>
        </div>
      );

    case "submission":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p> Exercises: {part.exerciseCount}</p>
          <p> Submit to: {part.exerciseSubmissionLink}</p>
          <p>type: {part.type}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>{part.description}</p>
          <p> Exercises: {part.exerciseCount}</p>
          <>
            Required skills:
            {part.requirements.map((req) => {
              return <p key={req}>{req}</p>;
            })}
          </>
          <p>type: {part.type}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
