import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Title } from '../components/headers/Title'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../context/theme/ThemeContext'
import { GradientBackground } from '../components/backgrounds/GradientBackground'
import { SearchInput } from '../components/form/SearchInput';

const HEIGHTSCREEN = Dimensions.get('window').height

export const MovementsScreen = () => {

    const {theme} = useContext(ThemeContext)

    return (
        <SafeAreaView style={styles.container}>
            <GradientBackground />

            {/* <SearchInput /> */}
            
            <View style={{...styles.movementsContainer, borderColor:theme.placeholderColor}}>
                <FlatList 
                    data={[1,2,3,4]}
                    renderItem={({index})=>(
                        <View style={{
                            ...styles.movement, 
                            borderColor:theme.placeholderColor, 
                            backgroundColor:theme.colors.card,
                            }}>
                        <View style={styles.rowMovement}>
                            <Text style={styles.label}>Rutina enviada</Text>
                            <Icon 
                                name='arrow-redo-outline'
                                color='green'
                                size={20}
                            />
                        </View>
                        <View style={styles.rowMovement}>
                            <Text style={styles.label}>Para:</Text>
                            <Text>gonzalojerezn@gmail.com</Text>
                        </View>
                        <View style={styles.rowMovement}>
                            <Text style={styles.label}>Nombre de rutina:</Text>
                            <Text>Rutina 5</Text>
                        </View>
                        <View style={styles.date}>
                            <Text style={{color:theme.grey}}>5 de Mayo, 2022</Text>
                        </View>
                    </View>
                    )}
                    
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        paddingHorizontal:5
    },
    movementsContainer:{
        width:'100%',
        marginTop:30,
        height:HEIGHTSCREEN - 220,
        overflow:'hidden'
    },
    movement:{
        borderRadius:15,
        marginVertical:5,
        paddingHorizontal:20,
        paddingVertical:25,
        justifyContent:'center'
    },
    rowMovement:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:3
    },
    label:{
        fontSize:16,
        fontWeight:'500',
        marginRight:5
    },
    date:{
        alignItems:'flex-end',
        position:'absolute',
        bottom:10,
        right:20
    }
});