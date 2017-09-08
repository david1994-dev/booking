export const apiUrl = process.env.API_URL || 'http://localhost'

export const facebook = {
  appId: '1637966656508513',
  version: 'v2.10',
  locale: 'en_GB'
}

export const googlemap = {
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
