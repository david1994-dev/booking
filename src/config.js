export const apiUrl = process.env.API_URL || 'http://localhost'
export const fbAppId = process.env.FB_APP_ID || ''
export const googleMapKey = process.env.GOOGLE_MAP_KEY || ''
export const mixpanelProjectToken = process.env.MIXPANEL_PROJECT_TOKEN || ''
export const domainUrl = process.env.DOMAIN
export const languages = {
  'vi': 'VN',
  'en': 'EN'
}

export const listHotels = [
  'Hanoi Back Packers  Hostel - 13 Hàng Muối ',
  'Hanoi Lucky - 91A Hàng Mã ',
  'Hanoi City Back Packer - 55 Bát Sứ',
  'Hanoi Centre Hostel - 13 Ngõ Trạm',
  'Funky Jungle hostel - 73 Mã mây',
  'Republic backpacers - 14A Phùng hưng',
  'Pavilian Hotel - Hàng Buồm'
]

export const facebook = {
  appId: fbAppId,
  version: 'v2.10',
  locale: 'en_GB'
}

export const googlemap = {
  disableDoubleClickZoom: true,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: 'administrative.country',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'administrative.locality',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }]
    }
  ]
}
