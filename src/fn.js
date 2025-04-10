import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const imagesUrlsData = require('../imagesUrls.json')

const { imagesUrls } = imagesUrlsData

const api = 'https://backend.drukhshan.com/posts/'

// Lists for random car details
const carNames = [
  'Corolla',
  'Honda',
  'BMW',
  'Toyota',
  'Audi',
  'Mercedes',
  'Ford',
  'Chevy',
  'Nissan',
  'Hyundai',
]

const carSuffixes = [
  'Super',
  'Sport',
  'Deluxe',
  'Turbo',
  'GT',
  'Xtreme',
  'Limited',
  'Classic',
  'Pro',
  'Elite',
]
const side = ['راسته', 'چپه']
const carYears = [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
]
const conditions = ['روغ', 'کاټ']
const fuelTypes = ['پطرول', 'ډیزل', 'هایبریډ', 'ګاز']
const price = [
  10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000,
]

const transmission = ['اتومات', 'ګېر', 'دواړه']
const engine = [
  '1000cc',
  '1100cc',
  '1200cc',
  '1300cc',
  '1400cc',
  '1500cc',
  '1600cc',
  '1700cc',
  '1800cc',
  '1900cc',
  '2000cc',
  '2100cc',
  '2200cc',
  '2300cc',
  '2400cc',
  '2500cc',
  '2600cc',
  '2700cc',
  '2800cc',
  '2900cc',
  '3000cc',
  '3100cc',
  '3200cc',
  '3300cc',
  '3400cc',
  '3500cc',
  '3600cc',
  '3700cc',
  '3800cc',
  '3900cc',
  '4000cc',
  '4100cc',
  '4200cc',
  '4300cc',
  '4400cc',
  '4500cc',
  '4600cc',
  '4700cc',
  '4800cc',
  '4900cc',
  '5000cc',
  'V4',
  'V6',
  'V8',
  'V10',
  'V12',
  'V16',
  'V18',
  'V20',
  'V24',
  'V30',
]
const users = [
  '007luzx4rtum0gml',
  '00b5aeyneh530u8j',
  '00y43x5cw9ghvui5',
  '014a5lummay7a3vs',
  '0193f2rx0ew3mouq',
  '02i24zg1izifc26j',
  '02lr2afm7em7sdam',
  '02x479ojjz6k3qh8',
  '037nwouwj07gkqr7',
  '043irqb2061l0ok5',
]

// Helper function to get a random item from an array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)]

// Function to generate a random post
const generateRandomPost = () => {
  return {
    car_name: `${getRandomItem(carNames)} ${getRandomItem(carSuffixes)}`,
    model: getRandomItem(carYears),
    conditions: getRandomItem(conditions),
    fuel_type: getRandomItem(fuelTypes),
    price: getRandomItem(price),
    engine: getRandomItem(engine),
    side: getRandomItem(side),
    information: 'this is basic information',
    transmission: getRandomItem(transmission),
    images: [getRandomItem(imagesUrls)],
    userId: getRandomItem(users),
  }
}

// Function to send a post to the API
const sendPost = async (postData) => {
  try {
    const params = new URLSearchParams({ userId: postData.userId })
    const urlWithParams = `${api}?${params.toString()}`

    const response = await fetch(urlWithParams, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })

    if (!response.ok) throw new Error(`Error: ${response.statusText}`)

    return response.json() // Return result for Promise.all()
  } catch (error) {
    console.error('Failed to send post:', error)
    return null // Ensure failed requests don't break Promise.all()
  }
}

// Function to send multiple posts concurrently using Promise.all()
export const sendBulkPosts = async (count) => {
  try {
    const posts = Array.from({ length: count }, generateRandomPost) // Generate posts

    const postPromises = posts.map(sendPost)
    const results = await Promise.all(postPromises)

    console.log(
      `Successfully sent ${results.filter(Boolean).length}/${count} posts.`
    )
  } catch (error) {
    console.error('Error sending bulk posts:', error)
  }
}
