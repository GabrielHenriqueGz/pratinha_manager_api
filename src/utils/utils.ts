const getSuspTimeLeft = (data: Date): string => {

    var seconds = Math.floor((data.getTime() - (new Date().getTime())) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    return ` *  Faltam ${days} dia(s), ${hours} hora(s), ${minutes} minuto(s) e ${seconds} segundo(s) para liberar!`;
}

const isNumeric = (str: string) => {
    if (typeof str != "string") return false
    return !isNaN(parseInt(str))
}

const addDays = (days: number) => {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}

const addHours = (date: Date, hours: number) => {
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    return date;
}

export {getSuspTimeLeft, isNumeric, addDays, addHours};