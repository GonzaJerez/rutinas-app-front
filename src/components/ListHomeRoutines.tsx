import React, { useContext, useEffect, useRef } from "react";
import { Dimensions, View, FlatList, Text, Alert, StyleSheet, Animated } from 'react-native';
import { Swipeable } from "react-native-gesture-handler";

import { Routine } from '../interfaces/interfaces';
import { CardRoutine } from "./cards/CardRoutine";
import { Title } from "./headers/Title";
import { LeftSwipe } from "./swipers/LeftSwipe";
import { RightSwipe } from "./swipers/RightSwipe";
import { ScreenEmpty } from "./ScreenEmpty";
import { RoutinesContext } from "../context/routines/RoutinesContext";

const widthScreen = Dimensions.get('window').width

interface Props {
    routines: Routine[];
    loadMore: () => Promise<void>
}

export const ListHomeRoutines = ( { routines, loadMore }: Props ) => {
    
    const {deleteRoutine} = useContext(RoutinesContext)

    const marginTop = useRef(new Animated.Value(0)).current;

    const moveTopAnimation = ()=>{
        Animated.timing(
            marginTop, {
                toValue:210,
                useNativeDriver: false,
                duration: 200
            }
        ).start()
    }

    useEffect(()=>{
        Animated.timing(
            marginTop, {
                toValue:0,
                useNativeDriver:false,
                duration:10
            }
        ).start()
    },[routines])

    // Modal para verificar que se quiere eliminar la rutina
    const onDeleteRoutine = (idRoutine:string)=>{
        Alert.alert(
            'Eliminar rutina', 
            '¿Seguro deseas eliminar la rutina? Esta acción no se puede deshacer.',
            [
                {
                    text:'Cancelar',
                    style:'cancel'
                },{
                    text: 'Eliminar',
                    onPress: ()=> deleteRoutine(idRoutine)
                }
            ],{
                cancelable: true,
            }
        )
    }
    
    const renderItem = ( item:Routine, index:number ) => {

        if (index === 0) {
            return (
                <Animated.View style={{alignItems:'center', marginVertical:10, marginTop, paddingTop:30}}>
                    <Swipeable
                        renderLeftActions={()=>(<LeftSwipe routine={item} moveTopAnimation={moveTopAnimation}/>)}
                        overshootLeft={false}
                        renderRightActions={()=>(<RightSwipe size="sizeRoutine" id={item._id} onDelete={onDeleteRoutine} />)}
                        overshootRight={false}
                    >
                        <CardRoutine
                            routine={ item }
                        />
                    </Swipeable>
                </Animated.View>
            )
        }

        return (
                <View style={{alignItems:'center', marginVertical:10}}>
                    <Swipeable
                        renderLeftActions={()=>(<LeftSwipe routine={item} moveTopAnimation={moveTopAnimation}/>)}
                        overshootLeft={false}
                        renderRightActions={()=>(<RightSwipe size="sizeRoutine" id={item._id} onDelete={onDeleteRoutine} />)}
                        overshootRight={false}
                    >
                        <CardRoutine
                            routine={ item }
                        />
                    </Swipeable>
                </View>
        );
    };

    return (
        <FlatList 
            data={routines}
            renderItem={({item, index})=>renderItem(item, index)}
            ListEmptyComponent={()=> <ScreenEmpty text="No tienes rutinas aún"/>}
            keyExtractor={ ( item ) => item._id }
            // ListHeaderComponent={ () => (
            //         <Title text='Mis rutinas' style={styles.titleList}/>
            //     ) }
            showsVerticalScrollIndicator={ false }
            onEndReached={ loadMore }
        />
    );
}

const styles = StyleSheet.create({
    titleList:{
        marginBottom:20, 
        marginTop: 30,
        paddingLeft:20, 
        width:widthScreen-20 ,
        // transform:[{scaleY:10}]
    }
});