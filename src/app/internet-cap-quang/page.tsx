import { Metadata } from 'next';
import { InternetHero } from '@/components/internet/InternetHero';
import { PricingTabs } from '@/components/internet/PricingTabs';
import { CustomerReviews } from '@/components/shared/CustomerReviews';
import { RelatedArticles } from '@/components/internet/RelatedArticles';
import { FAQ } from '@/components/shared/FAQ';
import { OtherServices } from '@/components/shared/OtherServices';
import { LeadForm } from '@/components/home/LeadForm';

export const metadata: Metadata = {
  title: 'Lắp Mạng Internet Cáp Quang FPT - Bảng Giá Mới Nhất 2026',
  description:
    'Đăng ký lắp mạng Internet cáp quang FPT tốc độ cao, trang bị Wi-Fi 6 thế hệ mới miễn phí. Bảng giá cước cá nhân và doanh nghiệp rẻ nhất.',
  alternates: {
    canonical: 'https://fpt-telecom.vn/internet-cap-quang',
  },
};

export default function InternetCapQuangPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Internet Cáp Quang FPT',
      description:
        'Dịch vụ mạng Internet cáp quang tốc độ cao từ FPT Telecom, trang bị modem Wi-Fi 6.',
      brand: {
        '@type': 'Brand',
        name: 'FPT Telecom',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1250',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Anh Tuấn' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody: 'Mạng cực kỳ ổn định. Mình đăng ký gói Giga xem Netflix 4K mượt mà.',
        },
      ],
      offers: {
        '@type': 'AggregateOffer',
        url: 'https://fpt-telecom.vn/internet-cap-quang',
        priceCurrency: 'VND',
        lowPrice: '190000',
        highPrice: '2500000',
        offerCount: '6',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Trang chủ',
          item: 'https://fpt-telecom.vn',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Internet Cáp Quang',
          item: 'https://fpt-telecom.vn/internet-cap-quang',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Thủ tục đăng ký lắp mạng FPT gồm những gì?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Thủ tục rất đơn giản. Đối với cá nhân, chỉ cần CMND/CCCD/Hộ chiếu. Đối với doanh nghiệp, cần Giấy phép kinh doanh.',
          },
        },
        {
          '@type': 'Question',
          name: 'Modem Wi-Fi 6 được trang bị miễn phí không?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Các gói cước từ SKY trở lên được trang bị miễn phí Modem ONT Wi-Fi 6 thế hệ mới. Gói GIGA được trang bị Modem Wifi tiêu chuẩn.',
          },
        },
      ],
    },
  ];

  const internetReviews = [
    {
      id: 1,
      name: 'Anh Tuấn',
      role: 'Khách hàng cá nhân - Hà Nội',
      content:
        'Mạng cực kỳ ổn định. Mình đăng ký gói Sky, được trang bị modem ONT Wi-Fi 6 sóng khoẻ lắm, kéo qua 2 lớp tường vẫn xem Netflix 4K mượt mà. Kỹ thuật viên hỗ trợ nhiệt tình.',
      rating: 5,
      avatar: 'T',
    },
    {
      id: 2,
      name: 'Chị Mai Lan',
      role: 'Chủ quán Cafe - TP.HCM',
      content:
        'Quán cafe của mình lúc đông khách lên tới 40 thiết bị truy cập cùng lúc. Từ khi chuyển sang dùng gói Super 250 của FPT, không còn khách hàng nào phàn nàn mạng chậm nữa.',
      rating: 5,
      avatar: 'L',
    },
    {
      id: 3,
      name: 'Nguyễn Hoàng',
      role: 'Game thủ',
      content:
        'Ping chơi game rất thấp và không bị loss packet. Đánh giải hay try-hard rank đều cực kỳ yên tâm. Rất đáng đồng tiền bát gạo.',
      rating: 5,
      avatar: 'H',
    },
  ];

  const internetFaq = [
    {
      question: 'Thủ tục đăng ký lắp mạng FPT gồm những gì?',
      answer:
        'Thủ tục rất đơn giản. Đối với cá nhân, chỉ cần CMND/CCCD/Hộ chiếu (bản gốc hoặc ảnh chụp). Đối với doanh nghiệp, cần Giấy phép kinh doanh và CMND/CCCD của người đại diện pháp luật.',
    },
    {
      question: 'Sau khi đăng ký, bao lâu thì có người đến lắp đặt?',
      answer:
        'FPT Telecom cam kết triển khai nhanh chóng trong vòng 12 - 24 giờ kể từ khi hoàn tất hợp đồng. Đội ngũ kỹ thuật sẽ liên hệ hẹn giờ tiện lợi nhất cho bạn.',
    },
    {
      question: 'Modem Wi-Fi 6 được trang bị miễn phí không?',
      answer:
        'Các gói cước từ SKY trở lên được trang bị miễn phí Modem ONT Wi-Fi 6 thế hệ mới nhất, giúp tăng tốc độ và vùng phủ sóng lên đáng kể. Gói GIGA được trang bị Modem Wifi tiêu chuẩn.',
    },
    {
      question: 'Nếu mạng gặp sự cố thì báo hỏng bằng cách nào?',
      answer:
        'Bạn có thể báo hỏng qua ứng dụng Hi FPT trên điện thoại, gọi tổng đài 1900 6600 (phím 2), hoặc liên hệ trực tiếp với nhân viên kinh doanh đã hỗ trợ đăng ký. Đội ngũ kỹ thuật trực 24/7/365 sẽ hỗ trợ bạn ngay lập tức.',
    },
    {
      question: 'Tôi có thể nâng cấp gói cước đang sử dụng được không?',
      answer:
        'Hoàn toàn được và miễn phí chuyển đổi gói. Bạn chỉ cần liên hệ tổng đài hoặc qua app Hi FPT, hệ thống sẽ cập nhật băng thông ngay trong vài phút mà không cần phải thay đổi thiết bị hay kéo lại dây.',
    },
    {
      question: 'Phí lắp đặt và các phụ phí phát sinh tính thế nào?',
      answer:
        'Phí hòa mạng/lắp đặt ban đầu: 300.000đ (có thể thay đổi tùy hình thức trả trước). Phí lắp đặt từ thiết bị thứ 2 trở đi: 400.000đ. Nếu bạn lắp thêm Mesh/Modem, cước phí cộng thêm 20.000đ/tháng cho mỗi thiết bị.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InternetHero />
      <PricingTabs />
      <CustomerReviews reviews={internetReviews} />
      <RelatedArticles />
      <FAQ data={internetFaq} />
      <OtherServices />

      {/* Re-use LeadForm for conversions */}
      <div className="dark:bg-background bg-slate-50 pt-12 pb-24">
        <div className="relative z-10 container mx-auto mb-[-60px] px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Bạn cần tư vấn chi tiết hơn?</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Hãy để lại thông tin, chuyên viên FPT sẽ liên hệ tư vấn gói cước phù hợp nhất với nhu
            cầu và hạ tầng tại khu vực của bạn.
          </p>
        </div>
        <LeadForm />
      </div>
    </>
  );
}
