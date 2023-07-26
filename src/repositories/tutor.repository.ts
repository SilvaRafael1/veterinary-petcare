import Tutor from '../models/Tutor';
import { TutorInterface } from '../models/Tutor';

class TutorRepository {
  async findAll() {
    const tutors = await Tutor.find().populate({ path: 'pets' });
    return tutors;
  }
  async findById(tutorId: string) {
    const tutor = await Tutor.findById(tutorId);
    return tutor;
  }
  async update(tutorData: TutorInterface, tutorId: string) {
    const updatedTutor = await Tutor.findByIdAndUpdate(tutorId, tutorData, {
      new: true,
      runValidators: true,
    });
    return updatedTutor;
  }
  async create(tutorData: TutorInterface) {
    const newTutor = await Tutor.create(tutorData);
    return newTutor;
  }
  async deleteOne(tutorId: string) {
    await Tutor.findByIdAndDelete(tutorId);
  }
  async save(tutor: TutorInterface) {
    return await tutor.save();
  }
}
