declare interface Apartment {
  id: number | null // Новое, вторичка
  description: string, // Новое, вторичка (обязательное)
  address: any, // Новое, вторичка (обязательное)
  adStatus: string | null // Новое, вторичка
  decoration: string | null // Новое (обязательное)
  operationType: string // Новое, вторичка (обязательное)
  category: string // Новое, вторичка (обязательное)
  price: number | null // Новое, вторичка (обязательное)
  marketType: string // Новое, вторичка (обязательное)
  houseType: string // Новое, вторичка (обязательное)
  floor: number | null // Новое, вторичка (обязательное)
  floors: number | null // Новое, вторичка (обязательное)
  rooms: number | null // Новое, вторичка (обязательное)
  square: number | null // Новое, вторичка (обязательное)
  status: string // Новое, вторичка (обязательное)
  kitchenSpace: number | null // вторичка (обязательное)
  newDevelopmentId: number | null // Новое (обязательно)
  propertyRights: string | null // Новое, вторичка (обязательное)
  courtyard: string | null // Новое, вторичка
  balconyOrLoggia: string | null // Новое, вторичка
  viewFromWindows: string | null // Новое, вторичка
  bathroomMulti: string | null // Новое, вторичка
  saleOptions: string | null // Новое, вторичка
  NDAdditionally: string | null // Новое, вторичка
  contactMethod: string | null // Новое, вторичка
  roomType: string | null // вторичка (обязательное)
  renovationType: string | null // вторичка (обязательное)
  SSAdditionally: string | null // вторичка
  leaseAppliances: string[] | null // вторичка
  inHouse: string[] | null // вторичка
  dealType: string | null // вторичка (обязательное)
  buildYear: number | null // вторичка
}
