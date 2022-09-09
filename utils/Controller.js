import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../config/firebase";

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

function onDateSelected(event, value, setDate, setDatePicker, setTimePicker) {
    setDate(value);
    setDatePicker(false);
    setTimePicker(true);
}

function onTimeSelected(event, value, setTimePicker, setPlannedDate, date) {
    setTimePicker(false);
    setPlannedDate(date.toDateString() + ' ' + value.toLocaleTimeString("en-US"));
}

export {addTaskToDatabase, onDateSelected, onTimeSelected};