import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, Image, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Carousel from 'react-native-snap-carousel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { RootPrivateNavigator } from '../../router/PrivateNavigator';
import { useFormRoutine } from '../../hooks/useFormRoutine';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { TextError } from '../../components/TextError';
import { baseURL } from '../../api/routinesApi';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import NumsToPickerNumbers from '../../components/NumsToPickerNumbers';


const WIDTHSCREEN = Dimensions.get( 'window' ).width;
const HEIGHT_ITEM = 40;
const minutes = [...Array(10).keys()] 
const seconds = [...Array(60).keys()]

interface Props extends NativeStackScreenProps<RootPrivateNavigator,'FormRoutineScreen'>{}

export const FormRoutineScreen = ({navigation}:Props) => {

    const { theme } = useContext( ThemeContext )
    const { colors } = theme;

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            title: (actualRoutine) ? 'Editar rutina' : 'Nueva rutina',
        })
    },[])
    
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
            >
                <View style={{paddingHorizontal:20}}>
                    <View style={ styles.inputBox }>
                        <Text style={ { ...styles.label, color: theme.lightText } }>Nombre de rutina:</Text>
                        <TextInput
                            style={ { ...styles.textInput, borderColor: colors.primary, color:colors.text } }
                            value={ form.name }
                            placeholder='Nombre de rutina'
                            placeholderTextColor={theme.placeholderColor}
                            onChangeText={ ( value ) => onChange( value, 'name' ) }
                            autoFocus
                        />
                    </View>

                    <View style={ styles.pickerBox }>
                        <Text style={ { ...styles.label, color: theme.lightText } }>Unidad de peso:</Text>
                        <Picker
                            selectedValue={ form.typeUnit }
                            onValueChange={ ( value ) => onChange( value, 'typeUnit' ) }
                            style={ { width: 100, color:colors.text } }
                            dropdownIconColor={colors.text}
                        >
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="lb" value="lb" />
                        </Picker>
                    </View>

                    <View style={ styles.pickerBox }>
                        <Text style={ {  ...styles.label,color: theme.lightText } }>Tiempo de descanso:</Text>

                        <View style={styles.timerWeight}>

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
                            />

                            <Text style={{...styles.label, color:theme.lightText}}>:</Text>

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
                            />

                            <View style={{backgroundColor:theme.backgroundTransparent,position:'absolute', height:42, width:'100%',top:0}}/>
                            <View style={{position:'absolute', height:30, width:'100%'}}/>
                            <View style={{backgroundColor:theme.backgroundTransparent,position:'absolute', height:42, width:'100%', bottom:0}}/>
                        </View>
                    </View>
                </View>

                <View style={styles.carouselContainer}>
                    <Carousel
                        data={ imgsRoutines }
                        renderItem={ ( { item } ) => (
                            <Image
                                source={ { uri: `${baseURL}/api/routinesImages/routines/${item}` } }
                                style={ styles.images }
                            />
                        ) }
                        sliderWidth={ WIDTHSCREEN}
                        itemWidth={ WIDTHSCREEN - 160}
                        inactiveSlideOpacity={ 0.9 }
                        onSnapToItem={(index)=>onChange(imgsRoutines[index], 'img')}
                    />
                </View>

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
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingTop: 30,
    },
    form: {

    },
    inputBox: {
        marginTop: 20
    },
    pickerBox: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pickerBoxTimer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timerWeight:{
        height:140,
        flexDirection:'row',
        alignItems:'center'
    },
    label: {
        fontSize: 16,
    },
    textInput: {
        borderBottomWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 16
    },
    carouselContainer:{
        height: 200
    },
    images: {
        width: 200, 
        height: 200, 
        resizeMode:'contain', 
        marginHorizontal:30
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonsContainer:{
        marginTop: 40,
        flexDirection:'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        marginBottom:30
    }
} );