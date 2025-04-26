// CORS Proxy Service
// This service helps bypass CORS restrictions when making direct API calls from the browser

/**
 * Use a CORS proxy to make a request to an external API
 * Note: This is for demonstration purposes only. In a production environment,
 * you should implement a proper backend proxy or use Google Maps JavaScript API.
 * 
 * @param {string} url - The URL to request
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - The JSON response
 */
export const fetchWithCorsProxy = async (url, options = {}) => {
  // List of available free CORS proxies (not reliable for production use)
  const corsProxies = [
    'https://cors-anywhere.herokuapp.com/',
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?'
  ];
  
  // Select a proxy (for demo, always use the first one)
  const proxy = corsProxies[0];
  
  try {
    // Append the URL to the proxy
    const proxyUrl = `${proxy}${encodeURIComponent(url)}`;
    
    // Make the request through the proxy
    const response = await fetch(proxyUrl, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error using CORS proxy:', error);
    throw error;
  }
};

/**
 * Alternative approach using JSONP (for Google Maps API specifically)
 * This can work without a CORS proxy for some APIs that support JSONP
 * 
 * @param {string} url - The base URL without callback parameter
 * @returns {Promise<Object>} - The JSON response
 */
export const fetchWithJsonp = (url) => {
  return new Promise((resolve, reject) => {
    // Create a unique callback function name
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    
    // Create script element
    const script = document.createElement('script');
    
    // Setup the callback function
    window[callbackName] = (data) => {
      // Clean up
      delete window[callbackName];
      document.body.removeChild(script);
      
      // Resolve the promise with data
      resolve(data);
    };
    
    // Set script source with callback parameter
    script.src = `${url}&callback=${callbackName}`;
    
    // Handle errors
    script.onerror = (error) => {
      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error('JSONP request failed'));
    };
    
    // Add the script to the document to execute it
    document.body.appendChild(script);
  });
}; 