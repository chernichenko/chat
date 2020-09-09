import { format, isToday} from 'date-fns'

export const getFormatedTime = value => {
    if (isToday(value)) return format(value, 'HH:mm')

    const yesterday = new Date(value)
    yesterday.setDate(yesterday.getDate() + 1)
    if (isToday(yesterday)) return 'Вчера'
    
    if (!isToday(value)) return format(value, 'dd.mm.yyyy')
}