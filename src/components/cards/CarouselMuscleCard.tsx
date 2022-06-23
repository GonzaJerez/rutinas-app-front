import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Muscle } from '../../interfaces/interfaces';
import { baseURL } from '../../api/routinesApi';

interface Props {
    muscle: Muscle;
    idDay:  string;
}

export const CarouselMuscleCard = ({muscle,idDay}:Props) => {

    const {navigate} = useNavigation<any>()
    const {theme:{colors}} = useContext(ThemeContext)
    
    return (
        <TouchableOpacity
            onPress={ () => navigate( 'ChooseWorkoutScreen', { muscle, idDay } ) }
            activeOpacity={0.9}
        >
            <View style={ {...styles.card, backgroundColor:colors.card} }>
                <Image
                    source={{ uri: `${baseURL}/api/routinesImages/muscles/${muscle.img}` }}
                    style={styles.image}
                    blurRadius={1}
                />
                <View style={styles.darkBackground}/>

                <Text style={styles.nameMuscle}>{ muscle.name }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 400,
        marginBottom:20,
        marginTop:30,
        paddingRight: 30,
        paddingBottom: 30,
        borderRadius: 25,
        overflow:'hidden',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        shadowColor: "#00000090",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    nameMuscle:{
        fontSize:28,
        fontWeight: '500',
        padding:10,
        color:'#fff',
        borderWidth:1,
        borderRadius:25,
        borderColor:'#fff'
    },
    image:{
        resizeMode:'cover', 
        width:300, 
        height:400, 
        position:'absolute'
    },
    darkBackground:{
        ...StyleSheet.absoluteFillObject,
        position:'absolute', 
        backgroundColor:'#11111199'
    }
});