'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-300 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Address */}
          <div className="col-span-1 space-y-4 md:col-span-2 lg:col-span-2">
            <h3 className="mb-4 text-xl font-bold text-white">{siteConfig.name}</h3>
            <p className="max-w-sm text-sm">
              Đại lý uỷ quyền chính thức của FPT Telecom, cung cấp dịch vụ Internet Cáp Quang,
              Truyền Hình FPT Play, và Camera An Ninh.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p>
                <strong>Địa chỉ:</strong> {siteConfig.address}
              </p>
              <p>
                <strong>Hotline:</strong>{' '}
                <a
                  href={`tel:${siteConfig.hotline.replace(/\./g, '')}`}
                  className="text-orange-400 hover:underline"
                >
                  {siteConfig.hotline}
                </a>
              </p>
              <p>
                <strong>Giờ làm việc:</strong> {siteConfig.workingHours}
              </p>
              <p className="mt-2 border-t border-slate-800 pt-2">
                <strong>Giấy phép ĐKKD:</strong> 0101778163 do Sở Kế hoạch & Đầu tư TP.Hà Nội cấp.
              </p>
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Dịch Vụ</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/internet-cap-quang" className="transition-colors hover:text-white">
                  Internet Cáp Quang
                </Link>
              </li>
              <li>
                <Link href="/truyen-hinh-fpt-play" className="transition-colors hover:text-white">
                  Truyền Hình FPT Play
                </Link>
              </li>
              <li>
                <Link href="/camera-fpt" className="transition-colors hover:text-white">
                  Camera An Ninh
                </Link>
              </li>
              <li>
                <Link href="/goi-combo" className="transition-colors hover:text-white">
                  Gói Combo Tiết Kiệm
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ & Sitemap */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/huong-dan-thanh-toan" className="transition-colors hover:text-white">
                  Hướng dẫn thanh toán
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="transition-colors hover:text-white">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-dich-vu" className="transition-colors hover:text-white">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="transition-colors hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="transition-colors hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Google Maps Embed */}
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <h4 className="mb-4 text-lg font-semibold text-white">Bản Đồ</h4>
            <div className="h-40 w-full overflow-hidden rounded-lg bg-slate-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.924840833758!2d105.7876801!3d21.0351717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab483eb8957b%3A0xc39115f57630fa98!2sFPT%20Telecom!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 text-xs text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            {/* Thêm link Social Media vào đây */}
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.zalo}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              Zalo
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              YouTube
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: siteConfig.hotline,
                contactType: 'customer service',
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: siteConfig.name,
              image: `${siteConfig.url}/logo.png`,
              telephone: siteConfig.hotline,
              address: {
                '@type': 'PostalAddress',
                streetAddress: siteConfig.address,
                addressCountry: 'VN',
              },
            },
          ]),
        }}
      />
    </footer>
  );
}
