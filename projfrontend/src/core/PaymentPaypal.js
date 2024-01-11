import React, { useEffect, useState } from 'react'
import DropIn from 'braintree-web-drop-in-react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty } from './helper/CardHelper'
import { createOrder } from './helper/OrderHelper'
import { getMeToken, processPayment } from './helper/PaymentHelper'

export default function PaymentPaypal({ products, setReload = f => f, reload = undefined }) {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    // console.log(products);

    const userID = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token


    const getToken = (userID, token) => {
      if (products.length === 0) {
        return; 
      }

      getMeToken(userID, token)
        .then((info) => {
          console.log("INFORMATION", info);
          if (info.error) {
            setInfo({ ...info, error: info.error });
          } else {
            const clientToken = info.clientToken;
            setInfo({ clientToken });
          }
        })
        .catch((error) => {
          // Handle the error
          console.error("Error getting PayPal token:", error);
          setInfo({ ...info, error: "Error getting PayPal token" });
        });
    };

    useEffect(() => {
      getToken(userID, token);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);



    const getAmount = () => {
        let amount = 0;
        products.map((p) => (
            amount = amount + p.price
        ))
        return amount
    }

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div className='d-grid'>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className='btn btn-success' onClick={onPurchase}>Buy</button>
                    </div>
                )
                    : (
                        <h3> Please Login or add Something to Cart</h3>
                    )}
            </div>
        )
    }

    // const onPurchase = () => {
    //     setInfo({ loading: true })
    //     let nonce
    //     let getNonce = info.instance
    //         .requestPaymentMethod()
    //         .then(data => {
    //             nonce = data.nonce
    //             const paymentData = {
    //                 paymentMethodNonce: nonce,
    //                 amount: getAmount()
    //             }

    //             processPayment(userID, token, paymentData)
    //                 .then(response => {
    //                     setInfo({ ...info, loading: false, success: response.success })
    //                     console.log("PAyment Success");
    //                     const orderData = {
    //                         products: products,
    //                         transaction_id: response.transaction.id,
    //                         amount: response.transaction.amount
    //                     }
    //                     createOrder(userID, token, orderData)
    //                     cartEmpty(() => {
    //                         console.log("Did we got a crash")
    //                     })
    //                     setReload(!reload)
    //                 })
    //                 .catch(err => {
    //                     setInfo({ loading: false, success: false })
    //                     console.log("PAyment Failed");

    //                 })
    //         })
    // }

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;

        console.log(info);
        // eslint-disable-next-line no-unused-vars
        let getNonce = info.instance
            .requestPaymentMethod()
            .then((data) => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount(),
                };

                processPayment(userID, token, paymentData)
                    .then((response) => {
                        setInfo({ ...info, success: response.success, loading: false });
                        console.log("PAYMENT SUCCESS");
                        const orderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                        };
                        createOrder(userID, token, orderData);
                        cartEmpty(() => {
                            console.log("Did we got a crash?");
                        });
                        setReload(!reload);
                    })
                    .catch((error) => {
                        setInfo({ loading: false, success: false });
                        console.log("PAYMENT FAILED");
                    });
            })
            .catch();
    };



    return (
        <div>
            <h3>Your bill is {getAmount()}</h3>
            {showbtdropIn()}
        </div>
    )
}
