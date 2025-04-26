import { createOrder, getOrders, getOrderById, updateOrder, cancelOrder } from '../api/api';

// Function to create a new order
export const submitOrder = async (orderData) => {
  try {
    // Validate required fields
    const requiredFields = [
      'address', 'city', 'postcode', 'contactName', 'contactPhone',
      'deliveryAddress', 'deliveryCity', 'deliveryPostcode', 'receiverName', 'receiverPhone',
      'weight', 'width', 'height', 'packageType', 'description', 'paymentMethod'
    ];

    const missingFields = requiredFields.filter(field => !orderData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Make sure we use the correct price (calculatedPrice or amount)
    let price = orderData.calculatedPrice;
    if (!price || price <= 0) {
      price = orderData.amount;
    }
    
    // Ensure price is a number
    if (typeof price === 'string') {
      const match = price.match(/\d+(\.\d+)?/);
      price = match ? parseFloat(match[0]) : 0;
    }
    
    console.log("Final price being submitted:", price);

    // Format data according to backend API expectations
    const formattedOrderData = {
      // Shipment data
      shipment_range: orderData.distance ? `${orderData.distance} km` : '0 km',
      pickup_loc: `${orderData.address}, ${orderData.address2 || ''}`.trim(),
      pickup_city: orderData.city,
      delivery_loc: `${orderData.deliveryAddress}, ${orderData.deliveryAddress2 || ''}`.trim(),
      delivery_city: orderData.deliveryCity,
      
      // Package dimensions
      width: Number(orderData.width) || 0,
      height: Number(orderData.height) || 0,
      weight: Number(orderData.weight) || 0,
      quantity: 1, // Default to 1 if not specified
      
      // Shipment details
      shipment_info: orderData.packageType || 'standard',
      shipment_note: orderData.description || '',
      
      // Dates and payment
      pickup_date: new Date().toISOString(), // Default to today
      payment_method: orderData.paymentMethod === 'card' ? 'online' : 'cash_on_delivery',
      price: price, // Use the parsed and validated price
      
      // Additional data that might be useful for the backend
      pickup_coordinates: orderData.pickupCoordinates,
      delivery_coordinates: orderData.deliveryCoordinates,
      has_coverage: orderData.hasCoverage || false,
      coverage_amount: orderData.coverageAmount || 0,
      
      // Extra information like fragile status or value
      fragile: orderData.fragile || false,
      value: orderData.value || 0
    };

    console.log('Submitting order with data:', formattedOrderData);

    // Create the order with the formatted data
    const response = await createOrder(formattedOrderData);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Function to get all orders for a user
export const fetchUserOrders = async () => {
  try {
    const response = await getOrders();
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Function to get a specific order by ID
export const fetchOrderById = async (orderId) => {
  try {
    const response = await getOrderById(orderId);
    return response;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

// Function to update an order
export const updateOrderDetails = async (orderId, orderData) => {
  try {
    const response = await updateOrder(orderId, orderData);
    return response;
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
    throw error;
  }
};

// Function to cancel an order
export const cancelUserOrder = async (orderId) => {
  try {
    const response = await cancelOrder(orderId);
    return response;
  } catch (error) {
    console.error(`Error canceling order ${orderId}:`, error);
    throw error;
  }
}; 