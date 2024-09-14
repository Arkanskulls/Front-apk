import { useAuth } from "../../hooks/auth"

export const sections = (type?: 'ADVISOR' | 'ATHLETE') => {
    
    const { signOut, deactivate, deleteUser } = useAuth();
    if (type === 'ADVISOR') {
        return [
            {
                id: 'meus-dados',
                section: 'Dados da assessoria',
                icon: 'user',
                pageName: 'MyData',
            },
            {
                id: 'avaliacoes',
                section: 'Avaliações',
                icon: 'star',
                pageName: 'AssessmentsAdvisor',
            },
            {
                id: 'historico',
                section: 'Histórico de treinos',
                icon: 'history',
                pageName: 'HistoricTraining',
            },
            {
                id: 'sair',
                section: 'Sair',
                icon: 'sign-out',
                action: signOut,
            },
            {
                id: 'deactivate',
                section: 'Desativar conta',
                icon: 'remove',
                action: deactivate,
            },
            {
                id: 'faq',
                section: 'FAQ',
                icon: 'question',
                color: '#000',
                pageName: 'MyData',
            },
            {
                id: 'sobre',
                section: 'Sobre o app',
                icon: 'info-circle',
                color: '#000',
                pageName: 'MyData',
            },
            {
                id: 'delete',
                section: 'Excluir conta',
                icon: 'remove',
                color: '#000',
                action: deleteUser,
            },
        ]
    } else {
        return [
            {
                id: 'meus-dados',
                section: 'Meus dados',
                icon: 'user',
                pageName: 'MyData',
            },
            {
                id: 'ativos',
                section: 'Treinos ativos',
                icon: 'play',
                pageName: 'ActiveTrainingsAthlete',
            },
            {
                id: 'historico',
                section: 'Histórico de treinos',
                icon: 'history',
                pageName: 'HistoricTrainingsAthlete',
            },
            {
                id: 'sair',
                section: 'Sair',
                icon: 'sign-out',
                action: signOut,
            },
            {
                id: 'deactivate',
                section: 'Desativar conta',
                icon: 'remove',
                action: deactivate,
            },
            {
                id: 'faq',
                section: 'FAQ',
                icon: 'question',
                color: '#000',
                pageName: 'MyData',
            },
            {
                id: 'sobre',
                section: 'Sobre o app',
                icon: 'info-circle',
                color: '#000',
                pageName: 'MyData',
            },
            {
                id: 'delete',
                section: 'Excluir conta',
                icon: 'remove',
                color: '#000',
                action: deleteUser,
            },
        ]
    }
}