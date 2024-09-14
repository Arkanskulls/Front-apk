import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    login,
    createAccount,
    sendLink,
    updateUser as updateAPI,
    deactivateAccount,
    uploadImage,
    refreshToken,
    deleteAccount,
} from '../services';
import api from '../services/api';
import { LoginForm, UserForm, UserUpdateForm } from '../interfaces'
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
    uuid: string;
    name: string;
    email: string;
    imageLink?: string;
    birthDate: string;
    cep: string;
    city: string;
    state: string;
    type?: 'ATHLETE' | 'ADVISOR';
    telephone?: string;
    checked?: boolean;
}

interface AuthContextData {
    signed: boolean;
    user: UserData | null;
    signIn(data: LoginForm): Promise<void>;
    createUser: (data: UserForm) => Promise<void>;
    updateUser: (data: UserUpdateForm) => Promise<void | string>;
    uploadPerfilImage: ({ src, }: { src: any; }) => Promise<any>;
    deactivate: () => Promise<void>;
    deleteAccountFluxo: (password: string) => Promise<void>;
    deleteUser: () => Promise<void>;
    signOut(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children?: React.ReactNode;
}

type RootStackParamList = {
    EmailVerify: undefined;
    Perfil: undefined;
    DeleteAccount: undefined;
};
  
type AuthScreenProp = StackNavigationProp<RootStackParamList, 'EmailVerify'>;

export const AuthProvider: React.FC<AuthProviderProps> = ({children}: AuthProviderProps) => {

    const navigation = useNavigation<AuthScreenProp>();
    const [user, setUser] = useState<UserData | null>({} as UserData);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RBuddyAuth:user')
            const storageToken = await AsyncStorage.getItem('@RBuddyAuth:token')
            const refreshTokenStorage = await AsyncStorage.getItem('@RBuddyAuth:refreshToken')

            api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;

            if(storageUser && storageToken) {
                setUser(JSON.parse(storageUser))
                setLoading(false);

                if (refreshTokenStorage) {
                    const response = await refreshToken({
                        accountUuid: JSON.parse(storageUser).uuid,
                        refreshToken: JSON.parse(refreshTokenStorage),
                    })

                    await AsyncStorage.setItem('@RBuddyAuth:user', JSON.stringify(response.data.account))
                }
            } else {
                setLoading(false);
                setUser(null)
            }
        }
       loadStorageData()
    }, [])

    useEffect(() => {
        async function updateUserStorageData() {
            const storageUser = await AsyncStorage.setItem('@RBuddyAuth:user', JSON.stringify(user))
        }
        updateUserStorageData();
    }, [user])

    const createUser = async (data: UserForm) => {
        setLoading(true);
        const response = await createAccount(data);
        if (response.status === 200) {
            setUser({
                uuid: response.data,
                email: '',
                name: '',
                birthDate: '',
                cep: '',
                city: '',
                state: '',
                checked: false,
            })
            Alert.alert(
                'Quase lá!',
                'Verifique seu E-mail para prosseguir.',
                [
                    {text: 'Verificar', onPress: () => navigation.navigate('EmailVerify')},
                ],
            );
            setLoading(false);
        } else {
            setLoading(false);
            Alert.alert(
                'Oops! Houve um problema',
                response,
                [
                  {text: 'Ok'},
                ],
            );
        }
    }

    const signIn = async (data: LoginForm) => {
        setLoading(true);
        const response = await login(data);
        if(response.status === 202 || response.status === 200) {
            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
            setLoading(false);
            setUser(response.data.account)
            if (response.data.account.checked === undefined ||
                response.data.account.checked === true) {
                await AsyncStorage.setItem('@RBuddyAuth:user', JSON.stringify(response.data.account))
                await AsyncStorage.setItem('@RBuddyAuth:token', response.data.token)
                if (response.data.refreshToken) {
                    await AsyncStorage.setItem('@RBuddyAuth:refreshToken', JSON.stringify(response.data.refreshToken))
                }
            } else {
                Alert.alert(
                    'Oops! Não foi possível realizar o login',
                    'Você pode tentar novamente.',
                    [
                      {text: 'Ok'},
                    ],
                );
            }
            return;
        } else if(response.response.status === 403) {
            setLoading(false);
            setUser({
                uuid: response.response.data,
                email: '',
                name: '',
                birthDate: '',
                cep: '',
                city: '',
                state: '',
                checked: false,
            })
            Alert.alert(
                'Oops!',
                'Verifique seu email para prosseguir.',
                [
                    {text: 'Cancelar'},
                    {text: 'Enviar link', onPress: async () => {
                        await sendLink({
                            uuid: response.response.data,
                        })
                        navigation.navigate('EmailVerify');
                    }},
                ],
            );
            return;
        } else {
            setLoading(false);
            Alert.alert(
                'Oops! Houve um problema',
                'Verifique seus dados e tente novamente.',
                [
                  {text: 'Ok'},
                ],
            );
        }
    }

    const signOut = async () => {
        await AsyncStorage.clear();
        setUser(null);
    }

    const updateUser = async (data: UserUpdateForm) => {
        setLoading(true);
        const response = await updateAPI(data);
        if (response.status === 200 && response.data) {
            setUser(response.data);
            setLoading(false);
            return 'OK'
        } else {
            setLoading(false);
            return response;
        }
    }

    const deactivateFluxo = async () => {
        const response = await deactivateAccount({
            uuid: user?.uuid as string,
        })
        if (response.status === 200) {
            setLoading(false)
            Alert.alert(
                'Conta desativada com sucesso',
                'Você está sem acesso ao RunBuddy.',
                [
                    {
                        text: 'Ok', onPress: () => {setLoading(false); signOut()},
                    }
                ]
            )
        } else {
            setLoading(false);
            Alert.alert(
                'Oops! Houve um problema',
                'Você pode tentar novamente.',
                [
                  {text: 'Ok'},
                ],
            );
        }
    }

    const deleteAccountFluxo = async (password: string) => {
        const response = await deleteAccount({
            email: user?.email as string,
            password: password,
        })
        if (response.status === 200 || response.status === 201) {
            setLoading(false)
            Alert.alert(
                'Conta excluída com sucesso',
                'Você está sem acesso ao RunBuddy.',
                [
                    {
                        text: 'Ok', onPress: () => {setLoading(false); signOut()},
                    }
                ]
            )
        } else {
            setLoading(false);
            Alert.alert(
                'Oops! Houve um problema',
                response,
                [
                  {text: 'Ok'},
                ],
            );
        }
    }

    const deactivate = async () => {
        setLoading(true);
        Alert.alert(
            'Desativar a conta',
            'Isso irá remover o seu login, e seu acesso será desativado.',
            [
                {
                    text: 'Cancelar', onPress: () => {
                        setLoading(false)
                    },
                },
                {
                    text: 'Desativar', onPress: async () =>{
                        await deactivateFluxo();
                    }
                }
            ]
        )
    }

    const deleteUser = async () => {
        setLoading(true);
        Alert.alert(
            'Excluir a conta',
            'Isso irá remover todos os seus dados, incluindo os registros na base de dados',
            [
                {
                    text: 'Cancelar', onPress: () => setLoading(false),
                },
                {
                    text: 'Deletar', onPress: () => {
                        setLoading(false);
                        navigation.navigate('DeleteAccount')
                    },
                }
            ]
        )
    }

    const uploadPerfilImage = async ({
        src,
    }: {src: any}) => {
        setLoading(true)
        const response = await uploadImage({
            uuid: user?.uuid as string,
            src: src,
        });
        if (response.status === 200 && response.data) {
            setUser(response.data);
            setLoading(false);
            return navigation.navigate('Perfil')
        } else {
            setLoading(false);
            return Alert.alert(
                'Oops! Houve um problema',
                'Você pode tentar novamente.',
                [
                  {text: 'Ok'},
                ],
            );
        }
    }
    
    return (
        <AuthContext.Provider value={{
            deleteAccountFluxo, deleteUser,
            signed: user && user.checked === undefined || user?.checked === true
                ? true : false, user, signIn, signOut, loading, createUser,
                updateUser, uploadPerfilImage, deactivate}}>
            {children}
        </AuthContext.Provider>
    )
} 

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};