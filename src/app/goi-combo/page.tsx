import { Metadata } from 'next';
import { ComboHero } from '@/components/combo/ComboHero';
import { ComboPricing } from '@/components/combo/ComboPricing';
import { CustomerReviews } from '@/components/shared/CustomerReviews';
import { FAQ } from '@/components/shared/FAQ';
import { OtherServices } from '@/components/shared/OtherServices';
import { LeadForm } from '@/components/home/LeadForm';

export const metadata: Metadata = {
  title: 'Gói Combo FPT - Internet & Truyền hình tiết kiệm 30%',
  description:
    'Đăng ký gói Combo Internet và Truyền hình FPT Play để tận hưởng ưu đãi 2 trong 1. Trải nghiệm giải trí không giới hạn với chi phí tiết kiệm nhất.',
  alternates: {
    canonical: 'https://fpt-telecom.vn/goi-combo',
  },
};

export default function GoiComboPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Combo Internet và Truyền Hình FPT',
      description:
        'Gói cước tích hợp đa dịch vụ Internet, Truyền hình, Camera giúp tiết kiệm chi phí.',
      brand: {
        '@type': 'Brand',
        name: 'FPT Telecom',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '2100',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Chị Thu Thủy' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody: 'Đổi qua Combo FPT thanh toán 1 lần khoẻ re, mà chi phí lại rẻ hơn hẳn.',
        },
      ],
      offers: {
        '@type': 'AggregateOffer',
        url: 'https://fpt-telecom.vn/goi-combo',
        priceCurrency: 'VND',
        lowPrice: '235000',
        highPrice: '350000',
        offerCount: '3',
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
          name: 'Gói Combo',
          item: 'https://fpt-telecom.vn/goi-combo',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Tôi đang dùng Internet FPT, giờ muốn đăng ký thêm Truyền hình thì tính phí thế nào?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Khách hàng đang dùng Internet khi đăng ký thêm Truyền hình FPT Play sẽ được hưởng mức giá ưu đãi đặc biệt.',
          },
        },
        {
          '@type': 'Question',
          name: 'Gói Combo có được trang bị Tivi Box không?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Có. Khi đăng ký gói Combo, FPT sẽ trang bị miễn phí cho bạn 01 Modem Wi-Fi và 01 Đầu thu FPT Play Box. Phí thiết bị Box thêm: 100.000đ/Box.',
          },
        },
      ],
    },
  ];

  const comboReviews = [
    {
      id: 1,
      name: 'Chị Thu Thủy',
      role: 'Khách hàng 3 năm',
      content:
        'Lúc trước nhà mình dùng mạng FPT, xem truyền hình cáp hãng khác đóng 2 hoá đơn rất phiền. Đổi qua Combo FPT thanh toán 1 lần khoẻ re, mà chi phí lại rẻ hơn hẳn.',
      rating: 5,
      avatar: 'T',
    },
    {
      id: 2,
      name: 'Anh Bảo',
      role: 'Chủ căn hộ chung cư',
      content:
        'Nhà mới chuyển về chung cư, mình đăng ký luôn gói 3-in-1 cả Internet, Tivi và Camera. Kỹ thuật viên đi dây âm tường gọn gàng, thiết bị cùng hãng nên tương thích rất tốt.',
      rating: 5,
      avatar: 'B',
    },
    {
      id: 3,
      name: 'Chú Minh',
      role: 'Khán giả truyền hình',
      content:
        'Dùng combo vừa lên mạng nhanh, vừa xem bóng đá ngoại hạng mượt. Tivi box có chức năng tìm kiếm bằng giọng nói rất tiện cho người lớn tuổi như chú.',
      rating: 5,
      avatar: 'M',
    },
  ];

  const comboFaq = [
    {
      question:
        'Tôi đang dùng Internet FPT, giờ muốn đăng ký thêm Truyền hình thì tính phí thế nào?',
      answer:
        'Khách hàng đang dùng Internet khi đăng ký thêm Truyền hình FPT Play sẽ được hưởng mức giá ưu đãi đặc biệt dành riêng cho khách hàng cũ (chỉ từ 44.000đ - 77.000đ/tháng tuỳ khu vực).',
    },
    {
      question: 'Gói Combo có được trang bị Tivi Box không?',
      answer:
        'Có. Khi đăng ký gói Combo, FPT sẽ trang bị miễn phí cho bạn 01 Modem Wi-Fi (chuẩn Wi-Fi 5 hoặc Wi-Fi 6) và 01 Đầu thu FPT Play Box điều khiển bằng giọng nói. Nếu cần lắp thêm Box, phí 100.000đ/Box.',
    },
    {
      question: 'Tôi có thể đổi từ gói Combo sang gói Internet đơn lẻ không?',
      answer:
        'Hoàn toàn được. FPT hỗ trợ khách hàng thay đổi gói cước linh hoạt theo nhu cầu sử dụng thực tế. Bạn chỉ cần liên hệ tổng đài hoặc qua ứng dụng Hi FPT để yêu cầu.',
    },
    {
      question: 'Thanh toán hoá đơn Combo bằng cách nào?',
      answer:
        'Bạn chỉ nhận 1 hoá đơn duy nhất mỗi tháng cho tất cả các dịch vụ (Internet, Truyền hình, Camera). Có thể thanh toán trực tuyến qua ứng dụng Hi FPT, Momo, ZaloPay, chuyển khoản ngân hàng hoặc thanh toán tại quầy giao dịch FPT.',
    },
    {
      question: 'Phí lắp đặt và phụ phí thiết bị thêm tính thế nào?',
      answer:
        'Phí hòa mạng ban đầu: 300.000đ. Phí lắp đặt thiết bị thứ 2 trở đi: 400.000đ. Phí thiết bị Box thêm: 100.000đ/Box. Camera từ chiếc thứ 2: 400.000đ/Camera. Mesh/Modem lắp thêm: cộng 20.000đ/tháng vào tiền cước mỗi thiết bị.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComboHero />
      <ComboPricing />
      <CustomerReviews
        title="Vì Sao Khách Hàng Chọn Combo FPT?"
        description="Lắng nghe những chia sẻ thực tế từ người dùng đang trải nghiệm dịch vụ."
        reviews={comboReviews}
      />
      <FAQ
        title="Giải Đáp Thắc Mắc Về Gói Combo"
        description="Các câu hỏi thường gặp khi đăng ký chung Internet và Truyền hình."
        data={comboFaq}
      />
      <OtherServices />

      {/* Re-use LeadForm for conversions */}
      <div className="dark:bg-background border-border/50 mt-12 border-t bg-slate-50 pt-12 pb-24">
        <div className="relative z-10 container mx-auto mb-[-60px] px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Nhận Tư Vấn Gói Combo Tiết Kiệm</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Để lại thông tin, chuyên viên FPT sẽ tính toán chi phí tối ưu nhất dựa trên nhu cầu sử
            dụng thực tế của gia đình bạn.
          </p>
        </div>
        <LeadForm />
      </div>
    </>
  );
}
