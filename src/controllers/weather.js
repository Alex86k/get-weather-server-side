import {db} from '../db'

export const getWeather = async (req, res) => {

    const currentDate = new Date(Date.now())
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const validMonth = month < 10 ? '0' + month : month
    const currentDay = currentDate.getDate()

    const today = `${year}-${validMonth}-${currentDay}`
    const yesterday = `${year}-${validMonth}-${currentDay - 1}`
    const monday = `${year}-${validMonth}-${currentDay - currentDate.getDay() + 1}`

    await Promise.all([
        db.query(`'SELECT temperature FROM weather 
    WHERE city = (
    SELECT id FROM city
     WHERE city.name = ${req.params.id}
     ) 
     AND date = ${today}`),

        db.query(`'SELECT temperature FROM weather 
    WHERE city = (
    SELECT id FROM city
     WHERE city.name = ${req.params.id}
     ) 
     AND date = ${yesterday}`),

        db.query(`'SELECT temperature FROM weather 
    WHERE city = (
    SELECT id FROM city
     WHERE city.name = ${req.params.id}
     ) 
     AND date >= ${monday}  
     AND date <= ${today}`).then(data =>
            data.reduce((sum, current) => sum + current) / data.length
        )
    ])
        .then(results => res.status(200).json({
                "today": results[0],
                "yesterday": results[1],
                "week-average": results[2]
            })
        )
        .catch((error) => res.status(400).send(error));

}

