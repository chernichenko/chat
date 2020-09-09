import React, { useEffect } from 'react'
import { format, isToday} from 'date-fns'

const Test = () => {

    const getMessageTime = value => {
        if (isToday(value)) return format(value, 'HH:mm')

        const yesterday = new Date(value)
        yesterday.setDate(yesterday.getDate() + 1)
        if (isToday(yesterday)) return 'Вчера'
        
        if (!isToday(value)) return format(value, 'dd.mm.yyyy')
    }
    
    useEffect(() => {
        const today = new Date()

        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        const beforeYesterday = new Date(yesterday)
        beforeYesterday.setDate(beforeYesterday.getDate() - 1)
        
        console.log('today', format(today, 'dd.mm.yyyy'))
        console.log('yesterday', format(yesterday, 'dd.mm.yyyy'))
        console.log('beforeYesterday', format(beforeYesterday, 'dd.mm.yyyy'))
        
        console.log('RESULT', getMessageTime(beforeYesterday))
    }, []) 

    return (
        <div>
            123
        </div>
    )
}

export default Test