const PAYMENT_VERIFY_URL = '/payment/verify';

export default {
  verify(clientKey) {

    // Get the payment intent id from the client key
    const paymentIntentId = clientKey.split('_client')[0];
    
    axios.get(PAYMENT_VERIFY_URL + '/' + paymentIntentId).then(response => {
      const resp = response.data.data;
      console.log(resp);
      if (response.status === 200 && !resp.success) {
        parentComponent.errors = ['Payment verification failed. Please contact us.'];
        parentComponent.status = 'fail';  
      }
    }).catch(err => {
      let errorMessages = [];
      
      if (err.response.status !== 200) {
        parentComponent.errors = ['Payment verification failed. Please contact us.'];
        parentComponent.status = 'fail'; 
        Promise.reject(new Error(errorMessages));
      }
    });
  },
}