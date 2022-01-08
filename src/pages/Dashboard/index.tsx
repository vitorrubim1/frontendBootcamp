import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-day-picker/lib/style.css";
import ptBR from "date-fns/locale/pt-BR";
import { FiClock, FiPower, FiUser } from "react-icons/fi";
import DayPicker, { DayModifiers } from "react-day-picker";
import { isToday, format, parseISO, isAfter } from "date-fns";
import { Link, useHistory } from "react-router-dom";

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
  Actions,
} from "./styles";

interface IMonthAvailabilityItem {
  day: string;
  available: boolean;
}

interface IAppointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    IMonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
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
      const { data } = await api.get<IAppointment[]>("/appointments/me", {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      });

      const appointmentsFormatted = data.map((appointment) => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), "HH:mm"),
        };
      });

      setAppointments(appointmentsFormatted);
    };

    getAllAppointment();
  }, [selectedDate]);

  /**
   *
   */

  /**
   * Pra não haver muitas renderizações, abstraio regras pra dentro do useMemo
   */
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

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date())
    );
  }, [appointments]);

  /**
   *
   */

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={LogoImage} alt="GoBarber logo" />

          <Profile>
            <img src={user.avatar_url || DefaultAvatar} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <Actions>
            <button type="button" onClick={() => history.push("/profile")}>
              <FiUser />
            </button>

            <hr />

            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </Actions>
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

          {isToday(selectedDate) && !!nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url || DefaultAvatar}
                  alt={`Cliente ${nextAppointment.user.name}`}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url || DefaultAvatar}
                    alt={`Cliente ${appointment.user.name}`}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url || DefaultAvatar}
                    alt={`Cliente ${appointment.user.name}`}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
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
