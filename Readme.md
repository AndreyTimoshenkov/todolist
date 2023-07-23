This is a To Do list created as a test task. The main functionality includes but is not limited to:
- Adding a new task;
- Marking tasks as done;
- Deleting tasks;

All the data is stored in localStorage and is loaded on page reload. Each task is stored as a separate object with its creation time as key in miliseconds (Date.now()). This way of storing is better optimised for multiple rows of tasks as oppose to keeping it all in one array and rewriting it on every minor change of the list. 

To run the project: 
1. npm install
2. npx serve ./
3. Enjoy