const { fahrenheitToCelsius , celsiusToFahrenheit } = require("../src/math");

test ("feh to cel" , () =>{
    expect(fahrenheitToCelsius(32)).toBe(0)
})

test ("cel to feh" , () =>{
    expect(celsiusToFahrenheit(0)).toBe(32)
})