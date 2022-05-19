import React, { useContext } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Carousel from 'react-native-snap-carousel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ThemeContext } from '../context/theme/ThemeContext';
import { RootPrivateNavigator } from '../router/PrivateNavigator';
import { useFormRoutine } from '../hooks/useFormRoutine';
import { ButtonSubmit } from '../components/form/ButtonSubmit';
import { TextError } from '../components/TextError';
import { Title } from '../components/Title';
import { baseURL } from '../api/routinesApi';


const widthScreen = Dimensions.get( 'window' ).width;

interface Props extends NativeStackScreenProps<RootPrivateNavigator,'FormRoutineScreen'>{}

export const FormRoutineScreen = ({navigation}:Props) => {

    const { theme: { colors } } = useContext( ThemeContext )
    
    const {form, imgsRoutines, error, onChange, onSubmit} = useFormRoutine(navigation)

    return (
        <View style={ styles.container }>
            {/* <GradientBackground /> */ }

            <ScrollView style={ styles.form }>

                <Title text='Nueva rutina' />
                <View style={ styles.inputBox }>
                    <Text style={ { ...styles.label, color: colors.text } }>Nombre de rutina:</Text>
                    <TextInput
                        style={ { ...styles.textInput, borderColor: colors.border } }
                        value={ form.name }
                        placeholder='Nombre de rutina'
                        onChangeText={ ( value ) => onChange( value, 'name' ) }
                    />
                </View>

                <View style={ styles.pickerBox }>
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

                <Carousel
                    data={ imgsRoutines }
                    renderItem={ ( { item } ) => (
                        <Image
                            source={ { uri: `${baseURL}/routinesImages/${item}` } }
                            style={ { width: 200, height: 300, marginHorizontal:20 } }
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
                <ButtonSubmit 
                    text='Siguiente' 
                    onPress={ onSubmit }
                    style={ { marginTop: 100 } } 
                />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    form: {
        // marginTop: 80,
        marginBottom: 30
    },
    inputBox: {
        marginTop: 80
    },
    pickerBox: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    }
} );