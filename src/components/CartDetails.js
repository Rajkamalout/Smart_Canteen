import React, { useEffect, useState } from "react";
import "./cartstyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleIteams,
  emptycartIteam,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();

  // Add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // Remove from cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item Removed From Your Cart");
  };

  // Remove single item
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e));
  };

  // Empty cart
  const emptycart = () => {
    dispatch(emptycartIteam());
    toast.success("Your Cart is Empty");
  };

  // Calculate total price
  const total = () => {
    let totalprice = 0;
    carts.forEach((ele) => {
      totalprice += ele.price * ele.qnty;
    });
    setPrice(totalprice);
  };

  // Calculate total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.forEach((ele) => {
      totalquantity += ele.qnty;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
    countquantity();
  }, [carts]);

  // Handle successful payment
  const handleApprove = (orderID) => {
    console.log("Payment Successful with Order ID:", orderID);
    toast.success("Payment Successful!");
    emptycart();
  };

  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-8 mt-5 mb-5 cardsdetails">
        <div className="card">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">
                Cart Calculation{carts.length > 0 ? ` (${carts.length})` : ""}
              </h5>
              {carts.length > 0 && (
                <button
                  className="btn btn-danger mt-0 btn-sm"
                  onClick={emptycart}
                >
                  <i className="fa fa-trash-alt mr-2"></i>
                  <span>Empty Cart</span>
                </button>
              )}
            </div>
          </div>
          <div className="card-body p-0">
            {carts.length === 0 ? (
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                        <i className="fa fa-shopping-cart"></i>
                        <p>Your Cart Is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className="prdct-delete"
                          onClick={() => handleDecrement(data.id)}
                        >
                          <i className="fa fa-trash-alt"></i>
                        </button>
                      </td>
                      <td>
                        <div className="product-img">
                          <img src={data.imgdata} alt="" />
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          <p>{data.dish}</p>
                        </div>
                      </td>
                      <td>  $ {data.price}</td>
                      <td>
                        <div className="prdct-qty-container">
                          <button
                            className="prdct-qty-btn"
                            type="button"
                            onClick={
                              data.qnty <= 1
                                ? () => handleDecrement(data.id)
                                : () => handleSingleDecrement(data)
                            }
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="qty-input-box"
                            value={data.qnty}
                            disabled
                          />
                          <button
                            className="prdct-qty-btn"
                            type="button"
                            onClick={() => handleIncrement(data)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-right">$ {data.qnty * data.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th colSpan={2}>&nbsp;</th>
                    <th>
                      Items In Cart:{" "}
                      <span className="text-danger">{totalquantity}</span>
                    </th>
                    <th className="text-right">
                      Total Price:{" "}
                      <span className="text-danger">
                      $ {totalprice}</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
          {carts.length > 0 && (
            <div className="p-3">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ASUvqcyLZ5Qsh7ZigLVhpjgdIq-BiN5aqsHSxZ388THveSYT6hLzk9nqaRgKchEXajXRSQNU1RQmQTws",
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalprice.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order
                      .capture()
                      .then((details) => {
                        console.log("Payment Details:", details);

                        handleApprove(details.id);
                      })
                      .catch((err) => {
                        console.error("Capture Error:", err);
                        toast.error("Payment failed. Please try again.");
                      });
                  }}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    toast.error(
                      "Something went wrong with the payment process."
                    );
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
