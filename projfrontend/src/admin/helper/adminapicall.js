import { API } from "../../backend";


//CATEGORY CALLS
export const createCategory = (userID, token, category) => {
    return fetch(`${API}/category/create/${userID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
        })
}

//get a category
export const getCategory = (categoryID) => {

    return fetch(`${API}/category/${categoryID}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))

}

// GET ALL CATEGORIES
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//delete category
export const deleteCategory = (categoryID, userID, token) => {
    return fetch(`${API}/category/${categoryID}/${userID}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//update category
export const updateCategory = (categoryID, userID, token, category) => {
    console.log(category)
    return fetch(`${API}/category/${categoryID}/${userID}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//PRODUCT CALLS

//create a product
export const createaProduct = (userID, token, product) => {
    return fetch(`${API}/product/create/${userID}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

// get all products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//get a product
export const getProduct = (productID) => {
    return fetch(`${API}/product/${productID}`, {
        method: "GET",
    }).then((response) => {
        console.log(response);
        return response.json();
    })
        .catch(err => console.log(err))
}


//update a product
export const updateProduct = (productID, userID, token, product) => {
    return fetch(`${API}/product/${productID}/${userID}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//delete a product
export const deleteProduct = (productID, userID, token) => {
    return fetch(`${API}/product/${productID}/${userID}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}