import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getRecipient } from '../api/users';
import useAsync from '../hooks/useAsync';
import logo from '../assets/images/logo.png';
import Button from './elements/Button';
import DESIGN_TOKEN from '../styles/tokens';

const { layout } = DESIGN_TOKEN;

const LogoIcon = styled.img`
  width: 107px;
  height: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 124.8rem;
  width: 100%;
  padding: 0 2.4rem;
  height: 64px;
  margin: 0 auto;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  @media (max-width: ${layout.breakpoint.mobile}) {
    display: ${({ $location, id }) => ($location.includes(`/post/${id}`) ? 'none' : 'block')};
  }
`;
const HorizontalDivider = styled.div`
  height: 0.1rem;
  background-color: #ededed;
`;

function GNB() {
  const [isLoadingRecipient, isErrorRecipient, getRecipientAsync] = useAsync(getRecipient);
  const [data, setData] = useState([]);
  const [bgData, setBgData] = useState([]);
  const { id } = useParams();
  const { name, messageCount, recentMessages, topReactions } = bgData;
  const [hasButton, setHasButton] = useState(false);
  const navigate = useNavigate();
  const onClick = () => navigate('/post');
  const location = useLocation();
  const handleButtonDisplay = useCallback(() => {
    if (location.pathname === '/' || location.pathname === '/list') {
      setHasButton(true);
      return;
    }
    setHasButton(false);
  }, [location.pathname]);

  useEffect(() => {
    handleButtonDisplay();
  }, [handleButtonDisplay]);

  useEffect(() => {
    const handlePostBackground = async (recipientId) => {
      const result = await getRecipientAsync(recipientId);
      if (!result) return;
      const recipientData = result;
      if (recipientData) {
        setBgData(recipientData);
      }
    };

    handlePostBackground(id);
  }, [id, getRecipientAsync]);

  return (
    <>
      <Container $location={location.pathname} id={id}>
        <Link to="/">
          <LogoIcon src={logo} alt="logo" />
        </Link>
        {hasButton && (
          <Button variant="outlined" width="157" height="large" type="button" onClick={onClick}>
            롤링 페이퍼 만들기
          </Button>
        )}
      </Container>
      <HorizontalDivider />
    </>
  );
}

export default GNB;
