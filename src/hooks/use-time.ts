export const useRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
    if (diffHours < 1) return "Justo ahora";
    if (diffDays < 1) {
      const hours = Math.floor(diffHours);
      return hours === 1 ? "Hace 1 hora" : `Hace ${hours} horas`;
    }
    const days = Math.floor(diffDays);
    return days === 1 ? "Hace 1 día" : `Hace ${days} días`;
  };