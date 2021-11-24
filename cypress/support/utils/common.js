
export const convertCurrencyToNumber = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g,""))
}