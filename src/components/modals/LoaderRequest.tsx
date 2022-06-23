import React, { useContext } from 'react'
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'

export const LoaderRequest = () => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    return (
        <Modal
            animationType='fade'
            transparent
            // visible={isModalOpen}
        >
            <View style={styles.modalBackground}>
                <ActivityIndicator 
                    color={colors.primary}
                    size={50}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground:{
        backgroundColor:'#11111170',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
});