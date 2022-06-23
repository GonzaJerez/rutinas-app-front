import React, { useContext, useEffect, useRef } from "react";
import { Dimensions, View, FlatList, Text, Alert, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { Swipeable } from "react-native-gesture-handler";

import { GroupsContext } from '../context/groups/GroupsContext';
import { Routine } from '../interfaces/interfaces';
import { CardRoutine } from "./cards/CardRoutine";
import { LeftSwipe } from "./swipers/LeftSwipe";
import { RightSwipe } from "./swipers/RightSwipe";
import { ScreenEmpty } from "./ScreenEmpty";
import { RoutinesContext } from "../context/routines/RoutinesContext";
import { ListCardPlaceholder } from "./placeholders/ListCardPlaceholder";
import { ThemeContext } from "../context/theme/ThemeContext";
import { CardPlaceholder } from "./placeholders/CardPlaceholder";

const widthScreen = Dimensions.get('window').width

interface Props {
    routines:               Routine[];
    swipeLeftUsable?:       boolean;
    isAdminRoutineGroup?:   boolean;
    loadMore:               ((idGroup?: string) => Promise<void>)
}

export const ListHomeRoutines = ( { routines, swipeLeftUsable=true,isAdminRoutineGroup=true, loadMore }: Props ) => {
    
    const {isLoading,isLoadingMore, isCreatigCopy, deleteRoutine} = useContext(RoutinesContext)
    const {isLoadingRoutinesGroup} = useContext(GroupsContext)
    const {theme} = useContext(ThemeContext)

    const marginTop = useRef(new Animated.Value(20)).current;

    // Animacion para cuando creo copia de rutina
/*     const moveTopAnimation = ()=>{
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
                toValue:20,
                useNativeDriver:false,
                duration:10
            }
        ).start()
    },[routines]) */

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
                <>
                    {(isCreatigCopy) && <CardPlaceholder marginTop={20}/>}
                    <Animated.View style={{paddingVertical:10, marginTop}}>
                        <Swipeable
                            renderLeftActions={()=>(swipeLeftUsable) && (<LeftSwipe routine={item}/>)}
                            overshootLeft={false}
                            renderRightActions={()=>(isAdminRoutineGroup) && (<RightSwipe id={item._id} onDelete={onDeleteRoutine} />)}
                            overshootRight={false}
                        >
                            <CardRoutine
                                routine={ item }
                            />
                        </Swipeable>
                    </Animated.View>
                </>
            )
        }

        return (
                <View style={{paddingVertical:10}}>
                    <Swipeable
                        renderLeftActions={()=>(swipeLeftUsable) && (<LeftSwipe routine={item}/>)}
                        overshootLeft={false}
                        renderRightActions={()=>(isAdminRoutineGroup) && (<RightSwipe id={item._id} onDelete={onDeleteRoutine} />)}
                        overshootRight={false}
                    >
                        <CardRoutine
                            routine={ item }
                        />
                    </Swipeable>
                </View>
        );
    };

    if(isLoading || isLoadingRoutinesGroup){
        return (
            <ListCardPlaceholder />
        )
    }

    return (
        <FlatList 
            data={routines}
            renderItem={({item, index})=>renderItem(item, index)}
            ListEmptyComponent={()=> <ScreenEmpty text="No tienes rutinas aún"/>}
            keyExtractor={ ( item ) => item._id }
            showsVerticalScrollIndicator={ false }
            onEndReached={ ()=>loadMore() }
            onEndReachedThreshold={0.5}
            ListFooterComponent={()=>(
                <View style={styles.footer}>
                    {(isLoadingMore)
                        ? (
                            <ActivityIndicator 
                                color={theme.colors.primary}
                            />
                        )
                        : (routines.length > 0) && (
                                <Text style={{color:theme.disabledColor}}>No hay más resultados</Text>
                            )
                    }
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    footer:{
        height:50,
        alignItems:'center',
        justifyContent:'center'
    }
});