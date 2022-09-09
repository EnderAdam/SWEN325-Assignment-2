import {Dimensions, StyleSheet} from "react-native";

const windowWidth = Dimensions.get('window').width;

const appStyles = StyleSheet.create({
    writeTaskWrapper: {
        position: 'absolute',
        top: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    taskName: {
        paddingVertical: 15,
        width: 250,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    description: {
        left: 25,
        top: 120,
        paddingVertical: 15,
        width: windowWidth - 50,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    people: {
        left: 25,
        top: 250,
        paddingVertical: 15,
        width: windowWidth - 50,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginTop: -20,
    },
    starRating: {
        top: 300,
        width: windowWidth - 50,
        left: 25,
    },
    setDateView: {
        top: 180,
        left: 25,
        width: windowWidth - 50,
    },
    setDateButton: {
        backgroundColor: '#f44ff4',
        color: '#f44ff4',
    },
    date: {
        fontSize: 18,
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },
    taskItemComponent: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    taskItemComponentFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '50%',
    },
    taskItemComponentCircle: {
        width: 24,
        height: 24,
        borderWidth: 3,
        borderColor: '#000',
        opacity: 0.4,
        borderRadius: 12,
        marginRight: 15,
    },
    taskItemComponentText: {
        maxWidth: '80%',
    },
    topRightAddAndSort: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
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
    signContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, welcomeStyle: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    iconLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 16
    },
    TaskIconTexts: {
        fontSize: 16,
        flexWrap: 'wrap',
        width: '85%',
    },
    editIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    TaskViewBottomLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 16,
    },
    taskViewButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default appStyles;