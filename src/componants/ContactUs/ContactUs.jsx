import groupContactUs from "../../assets/groupContactUs.png"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const ContactUs = () => {
  return (
    <div id="contactus" className="bg-primary text-white w-full overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col-reverse md:flex-row md:items-start md:gap-6 lg:gap-8">
          {/* Image container - Improved for small devices */}
          <div className="flex justify-center md:block">
            <img
              src={groupContactUs || "/placeholder.svg"}
              alt="Contact Us"
              className="ml-30 mr-auto md:ml-2 md:mr-0 rotate-270 md:rotate-0  w-auto h-auto max-w-[90%] md:max-w-none md:w-[400px] md:h-[580px] -mb-25 md:mb-10"
            />
          </div>

          {/* Content container */}
          <div className="w-full md:w-2/3 lg:w-3/5">
            <div className="flex flex-col mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-semibold text-3xl xs:text-4xl md:text-6xl lg:text-7xl text-center md:text-left mb-4 sm:mb-6 md:mb-10">
                Contact Us
              </h2>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-16">
                {/* Form - Improved for small devices */}
                <div className="w-full md:w-1/2">
                  <form className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-[95%] max-w-lg mx-auto md:mx-0">
                    <div className="border-b-2 p-2">
                      <input placeholder="Full Name" className="bg-transparent w-full focus:outline-none" />
                    </div>
                    <div className="border-b-2 p-2">
                      <input placeholder="E-mail" className="bg-transparent w-full focus:outline-none" />
                    </div>
                    <div className="border-b-2 p-2">
                      <input placeholder="Message" className="bg-transparent w-full focus:outline-none" />
                    </div>
                    <button className="bg-white w-40 sm:w-48 h-10 text-center text-lg xs:text-xl md:text-xl text-primary font-medium rounded-2xl hover:opacity-90 transition-opacity">
                      Contact Us
                    </button>
                  </form>
                </div>

                {/* Contact info - Improved for small devices */}
                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full md:w-1/2 mt-8 md:mt-0">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-0">
                    <div>
                      <h3 className="font-semibold text-xl xs:text-2xl md:text-2xl lg:text-3xl mb-2">Based in</h3>
                      <p className="font-thin text-sm xs:text-base md:text-lg lg:text-xl">
                        New York,
                        <br />
                        California, Ohio
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-xl xs:text-2xl md:text-2xl lg:text-3xl mb-2">Contact</h3>
                      <p className="font-thin text-sm xs:text-base md:text-lg lg:text-xl">hi@green.com</p>
                    </div>
                  </div>

                  {/* Social media icons - Improved spacing for small devices */}
                  <div className="flex justify-center md:justify-start gap-6 sm:gap-8 md:gap-10 text-2xl xs:text-3xl md:text-4xl lg:text-5xl mt-4 md:mt-auto">
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <FaFacebook />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <FaInstagram />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs

