export const addItemToCart = (item, next) => {
    let cart = []
    if (window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
    }
    cart.push({ ...item, count: 1 })
    localStorage.setItem("cart", JSON.stringify(cart))
    next()
}

export const loadCart = () => {
    if (window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productID) => {
    let cart = []
    if (window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        // eslint-disable-next-line array-callback-return
        cart.map((product, i) => {
            if (product._id === productID) {
                cart.splice(i, 1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart
}

export const cartEmpty = next => {
    if (window !== undefined) {
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}