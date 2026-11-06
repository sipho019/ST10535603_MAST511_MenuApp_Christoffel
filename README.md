# ST10535603_MAST511_MenuApp_Christoffel

**MAST511 POE - Chef's Menu Manager (Neo - Personal Chef Menu App)**
**Student:** Neo Sipho Mshumpela - ST10535603

## YouTube Demo Links
- **Part 3 (final):** *___*
- Part 2: https://youtube.com/shorts/Owtw4Day_hc?feature=share

## App Description
A mobile app for a personal chef to manage a menu, built with React Native and Expo (plain JavaScript).
The chef can add, edit and delete menu items, search and filter the menu, and view statistics about it.
Each menu item has a name, description, course (Starter, Main Course or Dessert) and price.

## Features Implemented

### Part 2
- View the menu in a list (FlatList)
- Add a new menu item with form validation

### Part 3 (this submission)
- **Manage menu items:** edit an existing item and update its details, or delete an item (with a confirmation popup). Changes show immediately in the list.
- **Search and filter:** search by dish name, filter by course (Starter, Main Course or Dessert), and clear the search and filter with one button. Search and filter work together.
- **Menu statistics:** total number of items, average price, and the number of items in each course.
- **Validation and feedback:** all fields are required, a course must be chosen, and the price must be a number greater than 0. Success and error messages are shown for every add, update and delete.
- **Improved layout:** consistent colours and buttons on every screen, a clear way back from each screen, and a "No dishes found" message for empty results.

## Code Improvements Since Part 2
- The single `App.js` was split into reusable pieces, so the code is shorter and easier to maintain.
- Reusable components: `AppButton` (one button used everywhere, with primary, dark and danger styles), `DishCard` and `CourseChips`.
- Reusable functions: `validateDish` (validation) and `calculateMenuStatistics` (statistics).
- A shared theme (`styles/theme.js`) holds colours and spacing, so the look can be changed in one place.
- Prices are stored as numbers, and courses come from one fixed list, so filtering and statistics are reliable.

## Project Structure
```
App.js                  Screens, app state and the main logic
components/
  AppButton.js          Reusable button
  DishCard.js           A menu item card with Edit and Delete
  CourseChips.js        Course buttons (used in the form and as the filter)
constants/
  courses.js            The list of courses
utils/
  validation.js         Menu item validation
  statistics.js         Menu statistics calculations
styles/
  theme.js              Colours and spacing
```

## How to Run the App
1. Clone the repo: `git clone https://github.com/sipho019/ST10535603_MAST511_MenuApp_Christoffel.git`
2. Go into the folder and install dependencies: `npm install`
3. Start Expo: `npx expo start` (use `npx expo start --tunnel` if your phone cannot connect)
4. Scan the QR code with the Expo Go app on your phone

## Notes
- Menu items are kept in the app's memory, so the list resets to the sample dishes when the app is reloaded.

## Dependencies
- React Native
- Expo (see `package.json` for the exact SDK version)

## Code Improvements Since Part 2
- The menu list is displayed with a FlatList [1], and styles are defined with StyleSheet [2].
- Delete confirmations use the Alert API [3].
- Search and filtering use the JavaScript array method `filter` [4], and the statistics use `reduce` [5].
- The app is built and run with Expo [6]



## GitHub
https://github.com/sipho019/ST10535603_MAST511_MenuApp_Christoffel## References
[1] Meta Platforms, Inc., "FlatList," React Native Documentation. Accessed: Nov. 6, 2026. [Online]. Available: https://reactnative.dev/docs/flatlist
[2] Meta Platforms, Inc., "StyleSheet," React Native Documentation. Accessed: Nov. 6, 2026. [Online]. Available: https://reactnative.dev/docs/stylesheet
[3] Meta Platforms, Inc., "Alert," React Native Documentation. Accessed: Nov. 6, 2026. [Online]. Available: https://reactnative.dev/docs/alert
[4] Mozilla Contributors, "Array.prototype.filter()," MDN Web Docs. Accessed: Nov. 6, 2026. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[5] Mozilla Contributors, "Array.prototype.reduce()," MDN Web Docs. Accessed: Nov. 6, 2026. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
[6] Expo, "Expo Documentation." Accessed: Nov. 6, 2026. [Online]. Available: https://docs.expo.dev/