import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.header`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const UserRole = styled.span`
  color: #666;
  font-size: 12px;
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const WelcomeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const WelcomeTitle = styled.h1`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 28px;
`;

const WelcomeSubtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
`;

const StatTitle = styled.h3`
  color: #666;
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  color: #333;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const StatDescription = styled.p`
  color: #888;
  margin: 0;
  font-size: 14px;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ActionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ActionIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const ActionTitle = styled.h3`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 18px;
`;

const ActionDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 14px;
`;

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const getInitials = (firstname: string, lastname: string): string => {
    return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  };

  return (
    <DashboardContainer>
      <Header>
        <HeaderContent>
          <Logo>
            🚀 DolibarrJS
          </Logo>
          
          <UserInfo>
            <UserAvatar>
              {user && getInitials(user.firstname, user.lastname)}
            </UserAvatar>
            <UserDetails>
              <UserName>
                {user?.firstname} {user?.lastname}
              </UserName>
              <UserRole>
                {user?.admin ? 'Administrateur' : 'Utilisateur'} • {user?.login}
              </UserRole>
            </UserDetails>
            <LogoutButton onClick={logout}>
              Déconnexion
            </LogoutButton>
          </UserInfo>
        </HeaderContent>
      </Header>

      <MainContent>
        <WelcomeCard>
          <WelcomeTitle>
            Bienvenue, {user?.firstname} !
          </WelcomeTitle>
          <WelcomeSubtitle>
            Vous êtes connecté à votre instance Dolibarr via DolibarrJS.
          </WelcomeSubtitle>
        </WelcomeCard>

        <StatsGrid>
          <StatCard>
            <StatTitle>Statut de connexion</StatTitle>
            <StatValue>✅ Connecté</StatValue>
            <StatDescription>API Dolibarr accessible</StatDescription>
          </StatCard>
          
          <StatCard>
            <StatTitle>Utilisateur</StatTitle>
            <StatValue>#{user?.id}</StatValue>
            <StatDescription>ID utilisateur Dolibarr</StatDescription>
          </StatCard>
          
          <StatCard>
            <StatTitle>Permissions</StatTitle>
            <StatValue>{user?.admin ? 'Admin' : 'Standard'}</StatValue>
            <StatDescription>Niveau d'accès</StatDescription>
          </StatCard>
        </StatsGrid>

        <ActionsGrid>
          <ActionCard>
            <ActionIcon>👥</ActionIcon>
            <ActionTitle>Gestion des clients</ActionTitle>
            <ActionDescription>
              Consulter et gérer vos clients
            </ActionDescription>
          </ActionCard>
          
          <ActionCard>
            <ActionIcon>📄</ActionIcon>
            <ActionTitle>Factures</ActionTitle>
            <ActionDescription>
              Créer et suivre vos factures
            </ActionDescription>
          </ActionCard>
          
          <ActionCard>
            <ActionIcon>📦</ActionIcon>
            <ActionTitle>Produits</ActionTitle>
            <ActionDescription>
              Gérer votre catalogue produits
            </ActionDescription>
          </ActionCard>
          
          <ActionCard>
            <ActionIcon>📊</ActionIcon>
            <ActionTitle>Rapports</ActionTitle>
            <ActionDescription>
              Consulter vos statistiques
            </ActionDescription>
          </ActionCard>
        </ActionsGrid>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;