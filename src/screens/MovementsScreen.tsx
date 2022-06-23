import React, { useContext, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemeContext } from '../context/theme/ThemeContext'
import { MovementsContext } from '../context/movements/MovementsContext';
import { useSearchMovements } from '../hooks/useSearchMovements';
import { GradientBackground } from '../components/backgrounds/GradientBackground'
import { SearchInput } from '../components/form/SearchInput';
import { CardMovement } from '../components/cards/CardMovement';
import { ListCardPlaceholder } from '../components/placeholders/ListCardPlaceholder';

export const MovementsScreen = () => {

    const {theme} = useContext(ThemeContext)
    const {listMovements, isLoading, loadMoreMovements} = useContext(MovementsContext)

    const [movementSearch, setMovementSearch] = useState('')
    const {resultsSearchMovements} = useSearchMovements(movementSearch)
    

    return (
        <SafeAreaView style={styles.container}>
            <GradientBackground />

            <SearchInput onChange={setMovementSearch}/>
            
            <View style={{...styles.movementsContainer, borderColor:theme.placeholderColor}}>
                {(isLoading)
                    ? (<ListCardPlaceholder />)
                    : (<FlatList 
                            data={(movementSearch === '') ? listMovements : resultsSearchMovements}
                            renderItem={({item})=>(<CardMovement movement={item}/>)}
                            // showsVerticalScrollIndicator={ false }
                            onEndReached={ loadMoreMovements }
                            
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
        marginTop:30,
        marginBottom:50,
        overflow:'hidden'
    },
});