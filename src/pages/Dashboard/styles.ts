import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  max-width: 1120px;

  margin: 0 auto;

  /* first image */
  > img {
    height: 80px;
  }

  button {
    margin-left: auto;

    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;

    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;

    margin-left: 16px;

    line-height: 25px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
      text-transform: capitalize;
    }
  }
`;

export const Content = styled.main`
  display: flex;

  max-width: 1120px;

  margin: 64px auto;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
    }

    /* segundo pra frente */
    span + span::before {
      content: "";

      width: 1px;
      height: 12px;

      background: #ff9000;

      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    position: relative;

    display: flex;
    align-items: center;

    background: #3e3b47;

    padding: 16px 24px;
    margin-top: 24px;

    border-radius: 10px;

    img {
      height: 80px;
      width: 80px;

      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      display: flex;
      align-items: center;

      margin-left: auto;

      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }

    /* border */
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10%;

      height: 80%;
      width: 2px;

      background: #ff9000;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    display: block; // pra linha ocupar todo o tamanho

    color: #999591;
    font-size: 20px;
    line-height: 26px;

    border-bottom: 1px solid #3e3b47;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.aside`
  display: flex;
  align-items: center;

  // second
  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;

    margin-left: auto;

    color: #f4ede8;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    display: flex;
    align-items: center;

    background: #3e3b47;

    padding: 16px 24px;
    margin-left: 24px;

    border-radius: 10px;

    img {
      height: 55px;
      width: 55px;

      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
`;
