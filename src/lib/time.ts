export const timeToHour = (timeString: string) => {
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  // Konvertierung von 12-Stunden- auf 24-Stunden-Format
  let hourIn24 = hours;
  if (period === 'PM' && hours !== 12) {
    hourIn24 += 12;
  } else if (period === 'AM' && hours === 12) {
    hourIn24 = 0;
  }

  return hourIn24 + minutes / 60;
};