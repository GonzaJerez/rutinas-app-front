import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, Image, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Carousel from 'react-native-snap-carousel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import DatePicker from 'react-native-date-picker'

import { ThemeContext } from '../../context/theme/ThemeContext';
import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { useFormRoutine } from '../../hooks/useFormRoutine';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { TextError } from '../../components/TextError';
import { Title } from '../../components/headers/Title';
import { baseURL } from '../../api/routinesApi';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import NumsToPickerNumbers from '../../components/NumsToPickerNumbers';


const widthScreen = Dimensions.get( 'window' ).width;
const HEIGHT_ITEM = 40;
const minutes = [...Array(10).keys()] 
const seconds = [...Array(60).keys()]

interface Props extends NativeStackScreenProps<RootPrivateNavigator,'FormRoutineScreen'>{}

export const FormRoutineScreen = ({navigation}:Props) => {

    const { theme: { colors } } = useContext( ThemeContext )
    
    const {
        form, 
        imgsRoutines, 
        error, 
        actualRoutine,
        timer,
        onChangeTimer, 
        onChange, 
        onSubmit, 
        onGetOut
    } = useFormRoutine(navigation)
    
    return (
        <View style={ styles.container }>

            <View 
                style={ styles.form }
                // showsVerticalScrollIndicator={false}
            >

                <Title text={(actualRoutine) ? 'Editar rutina' : 'Nueva rutina'} />
                <View style={ styles.inputBox }>
                    <Text style={ { ...styles.label, color: colors.text } }>Nombre de rutina:</Text>
                    <TextInput
                        style={ { ...styles.textInput, borderColor: colors.border } }
                        value={ form.name }
                        placeholder='Nombre de rutina'
                        onChangeText={ ( value ) => onChange( value, 'name' ) }
                    />
                </View>

                <View style={ styles.pickerBoxTimer }>
                    <Text style={ { ...styles.label, color: colors.text } }>Unidad de peso:</Text>
                    <Picker
                        selectedValue={ form.typeUnit }
                        onValueChange={ ( value ) => onChange( value, 'typeUnit' ) }
                        style={ { width: 100 } }
                    >
                        <Picker.Item label="kg" value="kg" />
                        <Picker.Item label="lb" value="lb" />
                    </Picker>
                </View>

                <View style={ styles.pickerBox }>
                    <Text style={ {  color: colors.text } }>Tiempo de descanso:</Text>

                    <View style={styles.carouselWeight}>

                        <FlatList 
                            data={minutes}
                            keyExtractor={(item)=>item.toString()}
                            ListHeaderComponent={()=>(<View style={{marginTop:56}}/>)}
                            ListFooterComponent={()=>(<View style={{marginBottom:45}}/>)}
                            renderItem={({item})=>(<NumsToPickerNumbers item={item}/>)}
                            showsVerticalScrollIndicator={false}
                            onScroll={({nativeEvent})=>onChangeTimer((nativeEvent.contentOffset.y/HEIGHT_ITEM).toString(), 'minutes') }
                            snapToOffsets={minutes.map((x, i) => (
                                i * HEIGHT_ITEM 
                            ))}
                            getItemLayout={(data,index)=>({length:HEIGHT_ITEM, offset:HEIGHT_ITEM * index, index})}
                            initialScrollIndex={timer.minutes}
                            maxToRenderPerBatch={20}
                            // initialNumToRender={Number(workoutInRoutine.sets[numActualSet - 1].weight)}
                            // style={{backgroundColor:'red', marginTop:55, overflow:'visible'}}
                        />

                        <Text style={styles.label}>:</Text>

                        <FlatList 
                            data={seconds}
                            keyExtractor={(item)=>item.toString()}
                            ListHeaderComponent={()=>(<View style={{marginTop:56}}/>)}
                            ListFooterComponent={()=>(<View style={{marginBottom:45}}/>)}
                            renderItem={({item})=>(<NumsToPickerNumbers item={item}/>)}
                            showsVerticalScrollIndicator={false}
                            onScroll={({nativeEvent})=>onChangeTimer((nativeEvent.contentOffset.y/HEIGHT_ITEM).toString(), 'seconds') }
                            snapToOffsets={seconds.map((x, i) => (
                                i * HEIGHT_ITEM 
                            ))}
                            getItemLayout={(data,index)=>({length:HEIGHT_ITEM, offset:HEIGHT_ITEM * index, index})}
                            initialScrollIndex={timer.seconds}
                            maxToRenderPerBatch={20}
                            // initialNumToRender={Number(workoutInRoutine.sets[numActualSet - 1].weight)}
                            // style={{backgroundColor:'red', marginTop:55, overflow:'visible'}}
                        />

                        <View style={{backgroundColor:'#ffffff70',position:'absolute', height:42, width:'100%',top:0}}/>
                        <View style={{position:'absolute', height:30, width:'100%'}}/>
                        <View style={{backgroundColor:'#ffffff70',position:'absolute', height:42, width:'100%', bottom:0}}/>
                    </View>
                </View>

                <Carousel
                    data={ imgsRoutines }
                    renderItem={ ( { item } ) => (
                        <Image
                            source={ { uri: `${baseURL}/routinesImages/${item}` } }
                            style={ { width: 200, height: 150, marginHorizontal:20 } }
                        />
                    ) }
                    sliderWidth={ widthScreen }
                    itemWidth={ 200 }
                    inactiveSlideOpacity={ 0.9 }
                    onSnapToItem={(index)=>onChange(imgsRoutines[index], 'img')}
                />

                {
                    ( error !== '' ) &&
                    <View style={ styles.errorContainer }>
                        <TextError size='medium'>{ error }</TextError>
                    </View>
                }

                <View style={styles.buttonsContainer}>
                    <SecondaryButton
                        text='Cancelar'
                        onPress={onGetOut}
                    />

                    <ButtonSubmit 
                        text={(actualRoutine) ? 'Guardar' : 'Crear'} 
                        onPress={ onSubmit }
                        // style={ { marginTop: 100 } } 
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        // paddingBottom:30
        // backgroundColor:'red'
    },
    form: {
        // marginTop: 80,
        // marginBottom: 30
    },
    inputBox: {
        marginTop: 50
    },
    pickerBox: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pickerBoxTimer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    carouselWeight:{
        height:140,
        flexDirection:'row',
        // borderWidth:1,
        alignItems:'center'
        // marginTop:60,
        // backgroundColor:'red',
        // top:-20
    },
    label: {
        fontSize: 22,
    },
    textInput: {
        // borderWidth:1,
        borderBottomWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 20
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonsContainer:{
        marginTop: 100,
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        marginBottom:30
    }
} );