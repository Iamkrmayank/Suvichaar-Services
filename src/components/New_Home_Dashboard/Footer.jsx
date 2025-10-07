
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[#E6E1DC] bg-[#FDF8F3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div className="col-span-1 md:col-span-2">
            <img
              src="/ContentLabs_2.png"
              alt="Contentlabs"
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-[#555555] max-w-md leading-relaxed">
              Transforming document processing with advanced AI technology. From OCR to intelligent automation, we make
              document workflows smarter and more efficient.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-[#2B2B2B] mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-[#555555]">
              <li>
                <a href="#services" className="hover:text-[#E6A24B] transition-colors">
                  OCR Processing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E6A24B] transition-colors">
                  Story Generation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E6A24B] transition-colors">
                  Document Translation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E6A24B] transition-colors">
                  AI Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#2B2B2B] mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-[#555555]">
              <li>
                <a href="mailto:contentlabs@suvichaar.org" className="hover:text-[#E6A24B] transition-colors">
                  contentlabs@suvichaar.org
                </a>
              </li>
              <li>
                <a href="https://labs.suvichaar.org" className="hover:text-[#E6A24B] transition-colors">
                  labs.suvichaar.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#E6E1DC] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-[#555555]">
            © {new Date().getFullYear()} Suvichaar | Content LABS. All rights reserved.
          </p>
          <p className="text-sm text-[#555555] mt-2 sm:mt-0">Powered by Suvichaar</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;