import React, { useContext, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemeContext } from '../context/theme/ThemeContext'
import { MovementsContext } from '../context/movements/MovementsContext';
import { useSearchMovements } from '../hooks/useSearchMovements';
import { GradientBackground } from '../components/backgrounds/GradientBackground'
import { SearchInput } from '../components/form/SearchInput';
import { CardMovement } from '../components/cards/CardMovement';
import { ListCardPlaceholder } from '../components/placeholders/ListCardPlaceholder';
import { ScreenEmpty } from '../components/ScreenEmpty';

export const MovementsScreen = () => {

    const {theme} = useContext(ThemeContext)
    const {listMovements, isLoading, isLoadingMore, loadMoreMovements, getMovements} = useContext(MovementsContext)

    const [movementSearch, setMovementSearch] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const {resultsSearchMovements} = useSearchMovements(movementSearch)
    

    return (
        <SafeAreaView style={styles.container}>
            <GradientBackground />

            <SearchInput onChange={setMovementSearch}/>

            {(listMovements.length === 0) && (
                <ScreenEmpty text='No hay movimientos aún'/>
            )}
            
            <View style={{...styles.movementsContainer, borderColor:theme.placeholderColor}}>
                {(isLoading)
                    ? (<ListCardPlaceholder />)
                    : (<FlatList 
                            data={(movementSearch === '') ? listMovements : resultsSearchMovements}
                            renderItem={({item})=>(<CardMovement movement={item}/>)}
                            onEndReached={ loadMoreMovements }
                            ListHeaderComponent={()=>(<View style={{height:20}}/>)}
                            ListFooterComponent={()=>(
                                <View style={styles.footer}>
                                    {(isLoadingMore)
                                        ? (
                                            <ActivityIndicator 
                                                color={theme.colors.primary}
                                            />
                                        )
                                        : (listMovements.length > 0) && (
                                                <Text style={{color:theme.disabledColor}}>No hay más resultados</Text>
                                            )
                                    }
                                </View>
                            )}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={isRefreshing}
                                    onRefresh={()=>getMovements({isLoadMore:false})}
                                    progressBackgroundColor={theme.colors.background}
                                    colors={[theme.colors.primary]}
                                />
                            }
                        />
                    )
                }
                
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    movementsContainer:{
        width:'100%',
        marginTop:10,
        // marginBottom:50,
        overflow:'hidden'
    },
    footer:{
        height:50,
        alignItems:'center',
    }
});