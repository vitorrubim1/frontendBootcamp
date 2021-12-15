import React, { useCallback, useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { FiClock, FiPower } from "react-icons/fi";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

import LogoImage from "../../assets/logo.svg";
import DefaultAvatar from "../../assets/default-avatar.jpg";

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from "./styles";

interface IMonthAvailabilityItem {
  day: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    IMonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    const handleGetMonthsAvailable = async () => {
      const response = await api.get(
        `/providers/${user.id}/month-availability`,
        {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        }
      );

      setMonthAvailability(response.data);
    };

    handleGetMonthsAvailable();
  }, [currentMonth, user.id]);

  // pra não haver muitas renderizações
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, Number(monthDay.day));
      });

    return dates;
  }, [currentMonth, monthAvailability]);

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

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://github.com/vitorrubim1.png" alt="" />

              <strong>Vitor Rubim</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://github.com/vitorrubim1.png" alt="" />

                <strong>Vitor Rubim</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://github.com/vitorrubim1.png" alt="" />

                <strong>Vitor Rubim</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
            fromMonth={new Date()} // Não permite selecionar meses anterior
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]} // sab e dom e os dias q vem da api como false
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
