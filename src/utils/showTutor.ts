import { TutorInterface } from '../models/Tutor';

const formatTutorToShow = (tutor: TutorInterface) => {
  const tutorShow = {
    name: tutor.name,
    phone: tutor.phone,
    email: tutor.email,
    date_of_birth: tutor.date_of_birth,
    zip_code: tutor.zip_code,
  };
  return tutorShow;
};

export { formatTutorToShow };
