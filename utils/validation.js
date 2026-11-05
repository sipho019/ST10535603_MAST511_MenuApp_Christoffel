import { COURSES } from '../constants/courses';

export function validateDish({ name, course, price, description }) {
  if (!name.trim() || !description.trim()) {
    return 'Please fill in the dish name and description.';
  }
  if (!COURSES.includes(course)) {
    return 'Please choose a course.';
  }
  const numericPrice = Number(price);
  if (price.trim() === '' || isNaN(numericPrice) || numericPrice <= 0) {
    return 'Price must be a number greater than 0.';
  }
  return null;
}