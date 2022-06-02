import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Muscle } from '../../interfaces/interfaces';

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
                <View style={styles.imageContainer}>
                    {/* <Image
                        source={muscle.uri}
                        style={{resizeMode:'contain', width:300, height:400, flex:1 }}
                    /> */}
                </View>
                <Text style={{...styles.nameMuscle, color:colors.text}}>{ muscle.name }</Text>
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
        paddingRight: 50,
        paddingBottom: 30,
        borderRadius: 25,
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
    imageContainer:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        width:300,
        height:500,
        top:-90,
        left:-50,
    },

    nameMuscle:{
        fontSize:28,
        fontWeight: '400'
    }
});