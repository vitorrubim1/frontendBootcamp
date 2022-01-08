import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-day-picker/lib/style.css";
import ptBR from "date-fns/locale/pt-BR";
import { isToday, format } from "date-fns";
import { FiClock, FiPower } from "react-icons/fi";
import DayPicker, { DayModifiers } from "react-day-picker";

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

interface IAppointment {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
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

  /**
   * Month available
   */
  useEffect(() => {
    const handleGetMonthsAvailable = async () => {
      const { data } = await api.get<IMonthAvailabilityItem[]>(
        `/providers/${user.id}/month-availability`,
        {
          params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
          },
        }
      );

      setMonthAvailability(data);
    };

    handleGetMonthsAvailable();
  }, [currentMonth, user.id]);

  /**
   *
   */

  /**
   * Request the appointments
   */

  useEffect(() => {
    const getAllAppointment = async () => {
      const { data } = await api.get("/appointments/me", {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      });

      console.log(data);
      setAppointments(data);
    };

    getAllAppointment();
  }, [selectedDate]);

  /**
   *
   */

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

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, "cccc", { locale: ptBR });
  }, [selectedDate]);

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
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Agendamento a seguir</strong>
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
