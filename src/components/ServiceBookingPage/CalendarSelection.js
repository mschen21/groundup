import React, { useState } from "react";
import { Box, Calendar, Heading, Text, ThemeContext } from "grommet";
import { DateTime } from "luxon";
import AvailableTimeSlot from "./AvailabilityList";

const CalendarSelection = ({ availableDates }) => {
  const [selectedDay, setSelectedDay] = useState();
  const [availableSlots, setAvailableSlots] = useState();

  const calendarTheme = {
    calendar: {
      day: {
        extend: `box-shadow: none !important;`,
      },
      extend: `box-shadow: none !important;`,
    },
    button: {
      default: {
        color: "text",
        border: undefined,
        padding: {
          horizontal: "5px",
          vertical: "5px",
        },
      },
      primary: {
        background: { color: "brand" },
        border: undefined,
        color: "text",
      },
      secondary: {
        border: { color: "brand", width: "1px" },
        color: "text",
        padding: {
          horizontal: "31px",
          vertical: "30px",
        },
        font: {
          weight: "normal",
        },
      },
      active: {
        background: { color: "brand-contrast" },
        color: "text",
        secondary: {
          background: "none",
          border: {
            color: "brand-contrast",
          },
        },
      },
      disabled: {
        opacity: "0.4",
        color: "text",
        border: {
          color: "#C4C4C4",
          width: "1px",
        },
        padding: {
          horizontal: "5px",
          vertical: "5px",
        },
      },
      hover: {
        background: { color: "active" },
        secondary: {
          border: { color: "active" },
        },
      },
    },
  };

  const onSelect = (value) => {
    setSelectedDay(value);

    const avail = availableDates.filter(
      (item) =>
        DateTime.fromISO(item.startTime).toISODate() ===
        DateTime.fromISO(value).toISODate()
    );
    setAvailableSlots(avail);
  };

  const datesProcessed = availableDates.map((item) =>
    // convert system iso to current local time
    DateTime.fromISO(item.startTime).toISODate()
  );

  const calendarBounds = [
    DateTime.now().startOf("month").toISODate(),
    DateTime.now().plus({ months: 3 }).toISODate(),
  ];

  return (
    <Box direction="row-responsive" gap="medium">
      <Box elevation="small" pad="small">
        <ThemeContext.Extend value={calendarTheme}>
          <Calendar
            size="medium"
            date={selectedDay}
            daysOfWeek
            bounds={calendarBounds}
            showAdjacentDays={false}
            gridArea="calendarView"
            fill
          >
            {({ date, day, isSelected }) => {
              return (
                <Box
                  background={
                    isSelected
                      ? "calendar-selected"
                      : datesProcessed.includes(
                          DateTime.fromISO(date.toISOString()).toISODate()
                        )
                      ? "calendar-available"
                      : "white"
                  }
                  onClick={() => {
                    //console.log(DateTime.fromISO(date.toISOString()).toISODate());
                    onSelect(date.toISOString());
                  }}
                  round={true}
                  fill
                >
                  <Box alignContent="center" pad="small" align="center" fill>
                    <Text size="medium">{day}</Text>
                  </Box>
                </Box>
              );
            }}
          </Calendar>
        </ThemeContext.Extend>
      </Box>
      {availableSlots && (
        <Box direction="column">
          <Heading level={4} margin={{ top: "0px" }}>
            {DateTime.fromISO(selectedDay).toLocaleString(
              DateTime.DATE_MED_WITH_WEEKDAY
            )}
          </Heading>
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <AvailableTimeSlot dateSlot={slot} key={slot.sk} />
            ))
          ) : (
            <Text>No available slots.</Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CalendarSelection;