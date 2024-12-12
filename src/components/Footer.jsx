import React from 'react';
import footer from "../assets/SmartCorn.png";

function Footer() {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto flex flex-wrap justify-between items-start px-4 lg:px-16 space-y-8 lg:space-y-0">
        {/* Logo dan Deskripsi */}
        <div className="w-full lg:w-1/3 text-left">
          <div className="flex items-center space-x-4">
            <img
              src={footer} // Ganti dengan path logo Anda
              alt="Logo SmartCorn"
              className="w-20 h-20"
            />
          </div>
          <p className="text-gray-600 text-sm mt-4 leading-relaxed">
            Merupakan sebuah aplikasi Web dan Mobile untuk membantu petani dan
            juga masyarakat yang ingin membudidayakan jagung. Kami
            memprioritaskan fitur yang mudah digunakan oleh siapapun dan
            dimanapun.
          </p>
        </div>

        {/* Halaman */}
        <div className="w-full lg:w-1/6 text-left">
          <h4 className="text-gray-800 font-semibold mb-4">Halaman</h4>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>
              <a
                href="/deteksi-penyakit"
                className="hover:text-green-600 transition duration-200"
              >
                Deteksi Penyakit
              </a>
            </li>
            <li>
              <a
                href="/edukasi"
                className="hover:text-green-600 transition duration-200"
              >
                Edukasi
              </a>
            </li>
            <li>
              <a
                href="/forum"
                className="hover:text-green-600 transition duration-200"
              >
                Forum
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="hover:text-green-600 transition duration-200"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Hubungi Kami */}
        <div className="w-full lg:w-1/3 text-left">
          <h4 className="text-gray-800 font-semibold mb-4">Hubungi Kami</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Jalan Menuju Kemenangan No 01.
            <br />
            Kota Awan, Kepulauan Riau 234123.
          </p>
          <p className="text-gray-600 text-sm mt-4">
            Telepon: +62-812-3456-7890
            <br />
            Office: 0778 123 3456
            <br />
            Email:{' '}
            <a
              href="mailto:help@smartcorn.com"
              className="text-blue-500 hover:underline"
            >
              help@smartcorn.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
