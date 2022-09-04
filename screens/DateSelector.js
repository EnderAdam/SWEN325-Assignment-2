import {Button, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from "react";

/**
 * @param navigation
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
const DateSelector = ({navigation, route}) => {

    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));
    const [previousScreen, setPreviousScreen] = useState(route.params.previousScreen); //to return to previous page on save

    function showDatePicker() {
        setDatePicker(true);
    }

    function showTimePicker() {
        setTimePicker(true);
    }

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    }

    function onTimeSelected(event, value) {
        setTime(value);
        setTimePicker(false);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.DateMainContainer}>

                <Text style={styles.text}>Date = {date.toDateString()}</Text>

                <Text style={styles.text}>Time = {time.toLocaleTimeString('en-US')}</Text>

                {datePicker && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        onChange={onDateSelected}
                        style={styles.datePicker}
                    />
                )}

                {timePicker && (
                    <DateTimePicker
                        value={time}
                        mode={'time'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={false}
                        onChange={onTimeSelected}
                        style={styles.datePicker}
                    />
                )}

                {!datePicker && (
                    <View style={{margin: 10}}>
                        <Button title="Show Date Picker" color="green" onPress={showDatePicker}/>
                    </View>
                )}

                {!timePicker && (
                    <View style={{margin: 10}}>
                        <Button title="Show Time Picker" color="green" onPress={showTimePicker}/>
                    </View>
                )}
                <View style={{margin: 10}}>
                    <Button onPress={() => {
                        navigation.navigate(previousScreen, {
                            date: date.toDateString(),
                            time: time.toLocaleTimeString("en-US")
                        });
                    }} title={'Save'}>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default DateSelector;


const styles = StyleSheet.create({
    DateMainContainer: {
        flex: 1,
        padding: 6,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },

});