import { COURSES } from '../constants/courses';

export function calculateMenuStatistics(dishes) {
  const totalItems = dishes.length;
  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const averagePrice = totalItems === 0 ? 0 : totalPrice / totalItems;
  const itemsPerCourse = COURSES.map(courseName => ({
    course: courseName,
    count: dishes.filter(dish => dish.course === courseName).length,
  }));
  return { totalItems, averagePrice, itemsPerCourse };
}