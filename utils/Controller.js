import {addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {auth, db} from "../config/firebase";

/**
 * Add a new task to the database with the given details to the current user
 * @param task - the task name
 * @param details - the details
 * @param plannedDate - the planned date
 * @param completedDate - the completed date
 * @param people - the people
 * @param stars - the stars
 * @returns {Promise<void>} - nothing
 */
const addTaskToDatabase = async (task, details, plannedDate, completedDate, people, stars) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            name: task,
            details: details,
            plannedDate: plannedDate,
            completedDate: completedDate,
            people: people,
            stars: stars,
            isCompleted: false,
            userId: auth.currentUser.uid
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

/**
 * If Date selector is selected, set the date picker to true
 * @param event - the event
 * @param value - the value
 * @param setDate - the state to set the date to
 * @param setDatePicker - the state to set the date picker to
 * @param setTimePicker - the state to set the time picker to
 */
function onDateSelected(event, value, setDate, setDatePicker, setTimePicker) {
    setDate(value);
    setDatePicker(false);
    setTimePicker(true);
}

/**
 * If Time selector is selected, set the time picker to true
 * @param event - the event
 * @param value - the value
 * @param setTimePicker - the state to set the time picker to
 * @param setPlannedDate - the state to set the planned date to
 * @param date - the date
 */
function onTimeSelected(event, value, setTimePicker, setPlannedDate, date) {
    setTimePicker(false);
    setPlannedDate(date.toDateString() + ' ' + value.toLocaleTimeString("en-US"));
}

/**
 * Update the task in the database with the given taskID
 * @param taskID - the id of the task to be updated
 * @param task - the new task name
 * @param details - the new details
 * @param date  - the new date (plannedDate if not completed, completedDate if completed)
 * @param people - the new people
 * @param stars - the new stars
 * @param isCompleted - whether task is completed or not
 * @returns {Promise<void>} - nothing
 */
const updateTask = async (taskID, task, details, date, people, stars, isCompleted) => {
    try {
        const docRef = doc(db, "tasks", taskID);
        if (isCompleted === 'Not completed') {
            await updateDoc(docRef, {
                name: task,
                details: details,
                plannedDate: date,
                people: people,
                stars: stars
            });
        } else {
            await updateDoc(docRef, {
                name: task,
                details: details,
                completedDate: date,
                people: people,
                stars: stars
            });
        }
        console.log("Document updated with ID: ", taskID);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

/**
 * Delete the task from the database
 * @param taskId - the id of the task to be deleted
 * @param navigation - the navigation
 * @returns {Promise<void>} - nothing
 */
let deleteTask = async (taskId, navigation) => {
    await deleteDoc(doc(db, "tasks", taskId));
    navigation.navigate('RemainingTasks', {refresh: true});
}

/**
 *  Update the task's status to completed
 *  Set the completedDate to the current time and date
 * @param taskId - the id of the task to be completed
 * @param navigation - the navigation
 * @returns {Promise<void>} - nothing
 */
let completeTask = async (taskId, navigation) => {
    const task = await doc(db, "tasks", taskId);
    await updateDoc(task, {completedDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString()});
    await updateDoc(task, {isCompleted: true});
    navigation.navigate('RemainingTasks', {refresh: true});
}

/**
 *  Update the task's status to not completed
 *  Remove the completedDate
 * @param taskId  - the id of the task to be uncompleted
 * @param navigation - the navigation
 * @returns {Promise<void>} - nothing
 */
let uncompleteTask = async (taskId, navigation) => {
    const task = await doc(db, "tasks", taskId);
    await updateDoc(task, {completedDate: "Not completed"});
    await updateDoc(task, {isCompleted: false});
    navigation.navigate('RemainingTasks', {refresh: true});
}

/**
 * Get all tasks for the current user
 * @param setTasks - the state to set the tasks to
 * @returns {Promise<void>} - nothing
 */
let loadTasks = async (setTasks) => {
    const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let newTasks = [];
    querySnapshot.forEach((doc) => {
        let newTask = doc.data();
        newTask.id = doc.id;
        newTasks.push(newTask);
    });

    setTasks(newTasks);
}

export {addTaskToDatabase, onDateSelected, onTimeSelected, updateTask, deleteTask, completeTask, uncompleteTask, loadTasks};