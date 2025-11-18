const defaultImage = new URL('../assets/react.svg', import.meta.url).href;

const imageMap = {
  'wireless earbuds': new URL('../assets/wireless earbuds.jpeg', import.meta.url).href,
  'led smart bulb': new URL('../assets/leb smart bulb.jpeg', import.meta.url).href,
  'usb-c cable': new URL('../assets/usb cable.jpeg', import.meta.url).href,
  'phone stand': new URL('../assets/phone stand.jpeg', import.meta.url).href,
  'portable power bank': new URL('../assets/Portable Power Bank.jpeg', import.meta.url).href,
  'desk lamp': new URL('../assets/Desk Lamp.jpeg', import.meta.url).href,
  'screen protector': new URL('../assets/Screen Protector.jpeg', import.meta.url).href,
  'bluetooth speaker': new URL('../assets/Bluetooth Speaker.jpeg', import.meta.url).href,
  'phone case': new URL('../assets/Phone Case.jpeg', import.meta.url).href,
  'keyboard & mouse combo': new URL('../assets/Keyboard & Mouse Combo.jpeg', import.meta.url).href,
  'web camera': new URL('../assets/Web Camera.jpeg', import.meta.url).href,
  'storage organizer': new URL('../assets/Storage Organizer.jpeg', import.meta.url).href,
  'gaming mouse': new URL('../assets/Gaming Mouse.jpeg', import.meta.url).href,
  'mechanical keyboard': new URL('../assets/Mechanical Keyboard.jpeg', import.meta.url).href,
  'yoga mat': new URL('../assets/Yoga Mat.jpeg', import.meta.url).href,
  'smartwatch': new URL('../assets/Smartwatch.jpeg', import.meta.url).href,
  'travel backpack': new URL('../assets/Travel Backpack.jpeg', import.meta.url).href,
  'air purifier': new URL('../assets/Air Purifier.jpeg', import.meta.url).href,
  'induction cooktop': new URL('../assets/Induction Cooktop.jpeg', import.meta.url).href,
  'fitness tracker': new URL('../assets/Fitness Tracker.jpeg', import.meta.url).href,
  'action camera': new URL('../assets/Action Camera.jpeg', import.meta.url).href,
  'cordless vacuum': new URL('../assets/Cordless Vacuum.jpeg', import.meta.url).href,
  'laptop stand': new URL('../assets/Laptop Stand.jpeg', import.meta.url).href,
  'noise cancelling headphones': new URL('../assets/Noise Cancelling Headphones.jpeg', import.meta.url).href,
  'portable projector': new URL('../assets/Portable Projector.jpeg', import.meta.url).href,
  'electric kettle': new URL('../assets/Electric Kettle.jpeg', import.meta.url).href,
  'wireless charger': new URL('../assets/Wireless Charger.jpeg', import.meta.url).href,
  'smart home hub': new URL('../assets/Smart Home Hub.jpeg', import.meta.url).href,
  'electric toothbrush': new URL('../assets/Electric Toothbrush.webp', import.meta.url).href,
  'hair dryer': new URL('../assets/Hair Dryer.jpeg', import.meta.url).href,
  'camping lantern': new URL('../assets/Camping Lantern.jpeg', import.meta.url).href,
  'massage gun': new URL('../assets/Massage Gun.jpeg', import.meta.url).href
};

export function getProductImage(name) {
  if (!name) {
    return defaultImage;
  }
  return imageMap[name.toLowerCase()] || defaultImage;
}

