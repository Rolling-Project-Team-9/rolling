import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { exData } from '../../api/api';
import Avatar from './Avatar';
import DESIGN_TOKEN from '../../styles/tokens';

const { color, typography } = DESIGN_TOKEN;

const AvatarsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 11.2rem;
  height: 2.8rem;
`;

const AvatarDiv = styled.div`
  display: flex;
  position: relative;
  ${({ zIndex }) => `z-index:${zIndex}`};
  right: ${({ order }) => `${1.2 * order}rem`};
  width: 2.8rem;
  height: 2.8rem;
`;

const RestDiv = styled(AvatarDiv)`
  right: 3.6rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid ${color.gray[200]};
  border-radius: 10rem;
  background-color: ${color.white};
  ${typography.font12Regular};
  z-index: 3;
`;

function Avatars() {
  const [sendersCount, setSendersCount] = useState();
  const [sendersImg, setSendersImg] = useState([]);

  useEffect(() => {
    const getSenders = async () => {
      const data = await exData();
      const { recentMessages } = data;
      setSendersImg(recentMessages.map((sender) => sender.profileImageURL));
      if (data.messageCount >= 102) {
        setSendersCount(102);
        return;
      }
      setSendersCount(data.messageCount);
    };
    getSenders();
  }, []);
  return (
    <AvatarsDiv>
      {sendersImg.map((item, index) => (
        <AvatarDiv zIndex={index} order={index}>
          <Avatar size="small" avatarImgSrc={item} />
        </AvatarDiv>
      ))}
      {/* eslint-disable-next-line */}
      {sendersCount > 3 && <RestDiv>+{sendersCount - 3}</RestDiv>}
    </AvatarsDiv>
  );
}

export default Avatars;