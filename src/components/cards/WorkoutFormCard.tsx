import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useState } from 'react'
import { CombinedWorkout, modeTraining, Set, WorkoutInRoutine } from '../../interfaces/interfaces'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { Picker } from '@react-native-picker/picker'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { RoutinesContext } from '../../context/routines/RoutinesContext'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { SetsRow } from '../SetsRow'
import { FloatDeleteIcon } from '../buttons/FloatDeleteIcon'
import { baseURL } from '../../api/routinesApi'
import { InfoModeTraining } from '../modals/InfoModeTraining'

interface Props {
    item: WorkoutInRoutine;
    index:number;
    state: CombinedWorkout;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    changeWorkout: (value: string, field:'tool' | 'mode', idWorkout: string) => void;
    deleteWorkout: (idWorkout: string) => void;
    addSet: (idWorkout: string) => void;
    changeSet: (idWorkout: string, idSet: string, form: Set) => void;
    deleteSet: (idWorkout: string, idSet: string) => void
}

export const WorkoutFormCard = ({
    index,
    item,
    state,
    isEditing,
    setIsEditing,
    addSet,
    changeSet,
    changeWorkout,
    deleteSet,
    deleteWorkout
}:Props)=>{

    const {navigate} = useNavigation<any>()

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);

    const {setActualCombinedWorkouts,actualRoutine} = useContext(RoutinesContext)

    /**
     * Agarra el ejercicio combinado actual y lo almacena en estado global
     * En "cardWorkout" cuando se elije otro ejercicio existiendo ya en el estado global
     * un ejercicio combinado lo agrega a este, sino deja el combinedWorkout como estaba
     */
    const addOtherWorkout = ()=>{
        setActualCombinedWorkouts(state)
        navigate('ChooseMuscleScreen',{isCombiningWorkout:true})
    }

    return(
        <View style={styles.container}>
            {(isOpenModalInfo) && (
                <InfoModeTraining 
                    isOpenModalInfo={isOpenModalInfo}
                    setIsOpenModalInfo={setIsOpenModalInfo}
                />
            )}
            <TouchableOpacity
                activeOpacity={0.95}
                onLongPress={()=> setIsEditing(true)}
                style={{...styles.workoutContainer, backgroundColor:colors.card}}
            >
                <View style={ styles.imageContainer }>
                    <Image 
                        source={ { uri: `${baseURL}/api/routinesImages/workouts/${item.workout.img}` } }
                        style={styles.image}
                        blurRadius={1}
                    />
                    <View style={styles.darkBackground}/>
                    <Text style={ {...styles.title, color:theme.whiteColor} }>{item.workout.name}</Text>
                    {(isEditing) && (
                        <FloatDeleteIcon 
                            onPress={()=>deleteWorkout(item._id)}
                            style={{position:'absolute', top:10, right:10}}
                        />
                    )}
                </View>
                <View style={ styles.formContainer }>

                    <View style={ styles.pickerContainer }>
                        <Text style={ {...styles.textLabel, color:theme.lightText} }>Herramienta:</Text>
                        {/* Picker */ }
                        <Picker
                            selectedValue={ item.tool }
                            onValueChange={ ( value ) => changeWorkout( value, 'tool', item._id ) }
                            style={ { width: 170, color:colors.text } }
                            dropdownIconColor={theme.lightText}
                            
                        >
                            {(item.workout.validTools.map( tool => (
                                <Picker.Item key={tool} label={tool} value={tool} />
                            )))}
                        </Picker>
                    </View>
                    {(!item.tool.startsWith('Barra')) && (
                        <View style={ styles.pickerContainer }>
                            <TouchableWithoutFeedback
                                onPress={()=>setIsOpenModalInfo(true)}
                            >
                                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                                    <Text style={ {...styles.textLabel, color:theme.lightText} }>Modo: </Text>
                                    <Icon 
                                        name='information-circle-outline'
                                        size={16}
                                        color={theme.lightText}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            {/* Picker */ }
                            <Picker
                                selectedValue={ item.tool }
                                onValueChange={ ( value ) => changeWorkout( value, 'mode', item._id ) }
                                style={ { width: 170, color:colors.text } }
                                dropdownIconColor={theme.lightText}
                            >
                                {(modeTraining.map( mode => (
                                    <Picker.Item key={mode} label={mode} value={mode} />
                                )))}
                            </Picker>
                        </View>
                    )}


                    <Text style={ {...styles.subtitle, color:colors.text} }>Series</Text>

                    <View style={ styles.containerSets }>
                        {
                            item.sets.map( ( set ) =>(
                                <SetsRow 
                                    set={set}
                                    idWorkout={item._id}
                                    typeUnit={actualRoutine?.typeUnit || 'kg'}
                                    isEditing={isEditing}
                                    changeSet={changeSet}
                                    deleteSet={deleteSet}
                                    key={set._id}
                                />
                            ))
                        }
                        <SecondaryButton text='Agregar serie' onPress={()=>addSet(item._id)}/>
                    </View>
                </View>
            
            </TouchableOpacity>
            {
                (index === state.combinedWorkouts.length - 1)
                && (
                    <TouchableOpacity
                        onPress={addOtherWorkout}
                        style={{...styles.addWorkoutButton, backgroundColor:theme.lightPrimary}}
                    >
                        <Text style={{color:theme.whiteColor}}>Combinar con otro ejercicio</Text>
                    </TouchableOpacity>
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create( {
    container:{
        alignItems:'center',
        // minHeight:780
        flex:1
    },
    workoutContainer:{
        marginTop: 10,
        width: 350,
        borderRadius:25,
        borderColor:'#ddd',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    imageContainer: {
        height: 180,
        overflow:'hidden',
        left:'-1%',
        width:'102%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderRadius:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    image:{
        position:'absolute', 
        width:'100%', 
        height:'100%',
        resizeMode:'cover',
    },
    darkBackground:{
        ...StyleSheet.absoluteFillObject,
        position:'absolute', 
        backgroundColor:'#00000099'
    },
    formContainer: {
        paddingHorizontal: 25,
        marginTop: 20
    },
    title: {
        fontSize: 25,
        textAlign:'center'
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerSets: {
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 20
    },
    textLabel: {
        fontSize: 16,
    },
    addWorkoutButton:{
        height:40,
        width:250,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        borderRadius:20,
        // marginBottom:50,
        marginVertical:30,
    },
} );