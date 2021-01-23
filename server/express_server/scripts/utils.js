function modificateActualTime(mode = 'day', value = 1) {
    var date = new Date();  
    switch (mode) {
        case 'day':
            date.setDate(date.getDate() + value);
            break;
        case 'hour':
            date.setHours(date.getHours() + value);  
            break; 
        case 'minute':
            date.setMinutes(date.getMinutes() + value); 
            break;    
        default:            
            break;
    }  
    return date
}

module.exports = {modificateActualTime}