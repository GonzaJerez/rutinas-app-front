import { useContext, useState } from "react";
import { Alert } from "react-native";
import { GroupsContext } from "../context/groups/GroupsContext";
import { useNavigation } from '@react-navigation/native';


export const useDeleteUsersOrGroup = ()=>{

    const {actualGroup, deleteGroup, deleteUsersFromGroup} = useContext(GroupsContext)

    const {replace} = useNavigation<any>()

    const [isDeletingUsers, setIsDeletingUsers] = useState(false)
    const [usersSelected, setUsersSelected] = useState<string[]>([])

    /**
     * Espera confirmacion para ejecutar la eliminación del grupo
     */
    const onDeleteGroup = () => {
        Alert.alert(
            'Eliminar grupo',
            `¿Estás seguro que deseas eliminar ${actualGroup?.name}? Esta acción no se puede deshacer`,
            [{
                text:'Cancelar',
            },{
                text:'Aceptar',
                onPress: async()=>{
                    await deleteGroup();
                    replace('SocialTopNavigator',{screen:'GroupsScreen'});
                }
            }],{
                cancelable:true
            }
        )
    }

    /**
     * Funcion para cuando se seleccionan usuarios para eliminar
     * Si estan seleccionados los deselecciona y viceversa
     */
    const onToggleSelected = (idUser:string)=>{
        if(usersSelected.includes(idUser)){
            setUsersSelected( usersSelected.filter( uid => uid !== idUser && uid))
        } else {
            setUsersSelected([...usersSelected, idUser])
        }
    }

    /**
     * Cancela la eliminacion de usuarios, vuelve a los estados por default
     */
    const onCancelDelete = ()=>{
        setIsDeletingUsers(false)
        setUsersSelected([])
    }

    /**
     * Eliminacion de usuarios, toma los id de "usersSelected" para eliminarlos
     */
    const onDeleteUsers = async()=>{
        await deleteUsersFromGroup({users:usersSelected})
        onCancelDelete()
    }

    return {
        actualGroup,
        isDeletingUsers,
        usersSelected,
        onToggleSelected,
        setIsDeletingUsers,
        onDeleteGroup,
        onDeleteUsers,
        onCancelDelete
    }
}