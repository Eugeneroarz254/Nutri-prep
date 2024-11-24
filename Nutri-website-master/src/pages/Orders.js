import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateAOrder } from '../features/user/userSlice'; // Import your updateAOrder action
import { Link } from 'react-router-dom';
import RecentlyViewedProducts from '../components/RecentlyViewedProducts';
import { useMediaQuery } from 'react-responsive';
import ProfileBreadCrumb from '../components/ProfileBreadCrumb';
import RecentlyViewedProducts2 from '../components/RecentlyViewedProducts2';
import { GoChecklist } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbMoodEmpty } from "react-icons/tb";
import { TiTickOutline } from "react-icons/ti";
import CustomModal from '../components/CustomeModal';
import Meta from '../components/Meta';

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(state => state?.auth?.getorderedProduct?.orders || []);
  const [activeTab, setActiveTab] = useState('To Be Shipped');
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const recentlyViewed = useSelector((state) => state.auth.recentlyViewed);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const [showTrackingFormModal, setShowTrackingFormModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order for tracking

  const filteredOrders = orderState?.filter(order => {
    if (activeTab === 'To Be Shipped') {
      return order?.orderStatus !== 'Cancelled' && order?.orderStatus !== 'Shipped' && order?.orderStatus !== 'Delivered';
    }
    if (activeTab === 'Shipped') {
      return order?.orderStatus === 'Shipped';
    }
    if (activeTab === 'Completed') {
      return order?.orderStatus === 'Delivered';
    }
    if (activeTab === 'Cancelled') {
      return order?.orderStatus === 'Cancelled';
    }
    return false; 
  }) || [];

  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const handleTrackOrder = (order) => {
    setSelectedOrder(order); 
    setShowTrackingFormModal(true); 
    if (window.matchMedia("(max-width: 768px)").matches) {
      document.body.style.overflow = 'hidden';  // Disable scrolling on small screens
    } 
  };

  const closeTrackingFormModal = () => {
    setShowTrackingFormModal(false);

    if (window.matchMedia("(max-width: 768px)").matches) {
      document.body.style.overflow = 'auto';  // Re-enable scrolling on small screens
    }
  };

  const renderTrackingFormModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Order Track</h2>
          <div>
            <span>Tracking No: <b className='track-no'>{selectedOrder?.orderItems[0]?.trackingInfo?.trackingNumber || 'N/A'}</b></span>
            <div className='tracking-hr1'></div> 

            <div className='nav-el'>
              <nav>
                <ul className='tracking-nav'>
                  <li
                    className={activeTab === 'To Be Shipped' ? 'active active-nav' : ''}
                  >
                    <GoChecklist className='track-icon'/> 
                    <span> Ordered</span>
                   
                  </li>
                  <li
                    className={activeTab === 'Shipped' ? 'active active-nav' : ''}
                  >
                    <LiaShippingFastSolid className='track-icon'/>
                    <span> In transit</span>
                   
                  </li>
                  <li
                    className={activeTab === 'Out of Delivery' ? 'active active-nav' : ''}
                  >
                  <TbMoodEmpty className='track-icon'/>         
                 <span> Out of delivery</span>
                     
                  </li>
                  <li
                    className={activeTab === 'Completed' ? 'active active-nav' : ''}
                  >
                   <TiTickOutline className='track-icon'/>                 
                  <span> Signed</span>
                  </li>
                </ul>
              </nav>
              <div className='tracking-hr'></div> 
              <div className='tracking-message'>
                {activeTab === 'To Be Shipped' && (
                  <div className='message-container'>
                  <div className='track-icon-container'>
                  <GoChecklist className='track-icon-2 active-nav'/>

                   </div>
                    <div>
                      <b>Ordered</b>
                      <p>The warehouse has received the order.</p>
                    </div>
                  </div>
                )}
                {activeTab === 'Shipped' && (
                  <div className='message-container'>
                  <div className='track-icon-container'>
                  <LiaShippingFastSolid className='track-icon-2 active-nav'/>

                  </div>
                    <div>
                      <b>In transit</b>
                      <p>The order has been shipped. You will be notified when our delivery team arrives at your location.</p>
                    </div>
                  </div>
                )}
                {activeTab === 'Out of Delivery' && (
                  <div className='message-container'>
                  <div className='track-icon-container'>
                  <TbMoodEmpty className='track-icon-2 active-nav'/>

                    </div>
                    <div>
                      <b>Out of delivery</b>
                      <p>Your order is out for delivery. You will be notified upon arrival.</p>
                    </div>
                  </div>
                )}
                {activeTab === 'Completed' && (
                  <div className='message-container'>
                  
                  <div className='track-icon-container'>
                  <TiTickOutline className='track-icon-2 active-nav' />

                    </div>
                    <div>
                      <b>Signed</b>
                      <p>The order was completed successfully. Thank you for choosing us!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="close-button" onClick={closeTrackingFormModal}>
            &times;
          </span>
        </div>
      </div>
    );
  };


  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setOpenCancelModal(true); // Open the Ant Design modal for order cancellation
  };

  const confirmCancelOrder = () => {
    const data = {
      orderId: orderToCancel,
      status: 'Cancelled',
    };
    dispatch(updateAOrder(data)); // Dispatch the action to update the order status
    setOpenCancelModal(false); // Close the modal after confirmation
  };

  const closeCancelModal = () => {
    setOpenCancelModal(false); // Close the cancel modal without canceling the order
  };

 
  return (
    <>
    <Meta title={"My Orders"} />

      <ProfileBreadCrumb title="My Orders" />
      <Container class1=" home-wrapper-2">
        <div className="row orders-row">
          <div className="col-12 orders-container-el bg-white w-100">
            <nav className="orders-navbar ">
              <ul>
                <li
                  className={activeTab === 'To Be Shipped' ? 'active' : ''}
                  onClick={() => setActiveTab('To Be Shipped')}
                >
                  To Be Shipped
                </li>
                <li
                  className={activeTab === 'Shipped' ? 'active' : ''}
                  onClick={() => setActiveTab('Shipped')}
                >
                  Shipped
                </li>
                <li
                  className={activeTab === 'Completed' ? 'active' : ''}
                  onClick={() => setActiveTab('Completed')}
                >
                  Completed
                </li>
                <li
                  className={activeTab === 'Cancelled' ? 'active' : ''}
                  onClick={() => setActiveTab('Cancelled')}
                >
                  Cancelled
                </li>
              </ul>
            </nav>

            <div className="col-12">
              {filteredOrders.length === 0 ? (
                <div className="empty-order-el">
                  <h4>No Orders Found</h4>
                  <Link className='orders-btn' to="/">Start Shopping</Link>
                </div>
              ) : (
                filteredOrders.map((item, index) => (
                  <div
                    style={{ backgroundColor: '#febd69' }}
                    className="row orders-wrapper px-3 my-3"
                    key={index}
                  >
                    <div className="col-3 align-items-center d-flex">
                      <p className="d-flex mb-0">
                        Tracking Number: {item?.orderItems[0]?.trackingInfo?.trackingNumber || 'N/A'}
                      </p>
                    </div>
                    {isDesktop ? (
                      <div className="col-12">
                        <div className="row py-3 px-3 order-header">
                          <div className="col-3 order-pr">
                            <h6 className="text-dark">Product</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-dark">Quantity</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-dark">Price</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-dark">Total Amount</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-dark">Status</h6>
                          </div>
                          {item?.orderItems?.map((i, index) => (
                            <div className="col-12" key={index}>
                              <div className="row position-relative order-details p-3">
                                <div className="col-3 d-flex order-pr">
                                  <img
                                    src={i?.product?.images[0]?.url}
                                    className="img-fluid order-image"
                                    alt="product"
                                  />
                                  <p>{i?.product.title}</p>
                                </div>
                                <div className="col-3">
                                  <p>{i?.quantity}</p>
                                </div>
                                <div className="col-3">
                                  <p>KES {i?.price.toLocaleString()}</p>
                                </div>
                                <div className="col-3">
                                  <p>KES {item?.totalPriceAfterDiscount.toLocaleString()}</p>
                                </div>
                                <div className="col-3">
                                  <p className="d-flex mb-0 order-status-p">
                                    {item?.orderStatus}
                                  </p>
                                </div>
                                {item?.orderStatus !== 'Cancelled' && (
                              <div className='cancel-order-container'>
                                <div className='btns-container'>
                                  {(item?.orderStatus === 'Shipped' || item?.orderStatus === 'Delivered') && (
                                    <button className='track-order-btn' onClick={() => handleTrackOrder(item)}>
                                      Track Order
                                    </button>
                                  )}

                                  {item?.orderStatus !== 'Shipped' && item?.orderStatus !== 'Delivered' && (
                                    <>
                                      <button className='track-order-btn' onClick={() => handleTrackOrder(item)}>
                                        Track Order
                                      </button>
                                      <button
                                        className='cancel-order-btn'
                                        onClick={() => handleCancelOrder(item._id)}
                                      >
                                        Cancel Order
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}




                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Mobile View
                      <div className="col-16">
                        <div className="row py-3 order-header">
                          {item?.orderItems?.map((i, index) => (
                            <div className="col-12" key={index}>
                              <div className="row order-details p-3">
                                <div className="col-3 d-flex order-pr">
                                  <img
                                    src={i?.product?.images[0]?.url}
                                    className="img-fluid order-image"
                                    alt="product"
                                  />
                                  <p>{i?.product.title}</p>
                                </div>
                                <div className="col-3">
                                  <b>Quantity:</b>
                                  <p>{i?.quantity}</p>
                                </div>
                                <div className="col-3">
                                  <b>Price:</b>
                                  <p>KES {i?.price.toLocaleString()}</p>
                                </div>
                                <div className="col-3">
                                  <b>Total Amount:</b>
                                  <p>KES {item?.totalPriceAfterDiscount.toLocaleString()}</p>
                                </div>
                                <div className="col-3">
                                  <b>Order Status:</b>
                                  <p className="d-flex mb-0 order-status-p">
                                    {item?.orderStatus}
                                  </p>
                                </div>

                                {item?.orderStatus !== 'Cancelled' && (
                                <div className='col-3 mt-3 position-relative'>
                                     <div className='btns-container'>
                                  {(item?.orderStatus === 'Shipped' || item?.orderStatus === 'Delivered') && (
                                    <button className='track-order-btn' onClick={() => handleTrackOrder(item)}>
                                      Track Order
                                    </button>
                                  )}

                                  {item?.orderStatus !== 'Shipped' && item?.orderStatus !== 'Delivered' && (
                                    <>
                                      <button className='track-order-btn' onClick={() => handleTrackOrder(item)}>
                                        Track Order
                                      </button>
                                      <button
                                        className='cancel-order-btn'
                                        onClick={() => handleCancelOrder(item._id)}
                                      >
                                        Cancel Order
                                      </button>
                                    </>
                                  )}
                                </div>

                                </div>
                              )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <section className="px-3 mt-3 recently-viewed-section justify-content-center d-flex w-100 flex-column align-items-center">
           {isDesktop ? (
          <RecentlyViewedProducts />
           ) : (
            <div className="w-100 other-products-container">
            <div>
            {recentlyViewed.length > 0 && (
            <div className='w-100 d-flex justify-content-start'>
              <h2 className="related-products-heading">Recently viewed products</h2>
            </div>
          )}
           <RecentlyViewedProducts2/>
            </div>
    
     
           </div>
           )}
          
          </section>
        </div>
      </Container>
      <CustomModal
        open={openCancelModal}
        hideModal={closeCancelModal}
        performAction={confirmCancelOrder}
        title="Are you sure you want to cancel this order?"
      />
      {showTrackingFormModal && renderTrackingFormModal()}
    </>
  );
};

export default Orders;
