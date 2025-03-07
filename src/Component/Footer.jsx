const Footer = () => { 
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-7 md:px-4">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">GadXtreme</h2>
          <p className="text-sm">
            Your one-stop destination for the latest gadgets and accessories.
            Quality products, fast delivery, and exceptional service.
          </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Home</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Shop</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">About Us</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">FAQs</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Shipping & Delivery</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Returns & Refunds</a>
            </li>
            <li className="mb-2 hover:text-gray-400">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
          <p className="mb-3">We accept:</p>
          <img
            src="https://extremegadgets.com.bd/wp-content/uploads/2022/12/payments.png"
            alt="Bank"
            className="h-12 w-auto"
          />
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        &copy; 2025 GadXtreme. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
