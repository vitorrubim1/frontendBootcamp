import React from "react";
import { FiPower } from "react-icons/fi";

import LogoImage from "../../assets/logo.svg";
import DefaultAvatar from "../../assets/default-avatar.jpg";
import { useAuth } from "../../hooks/auth";

import { Container, Header, HeaderContent, Profile } from "./styles";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={LogoImage} alt="GoBarber logo" />

          <Profile>
            <img src={user.avatar_url || DefaultAvatar} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
