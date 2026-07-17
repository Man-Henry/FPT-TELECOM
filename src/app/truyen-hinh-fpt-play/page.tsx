import { Metadata } from 'next';
import { TvHero } from '@/components/tv/TvHero';
import { TvPricing } from '@/components/tv/TvPricing';
import { CustomerReviews } from '@/components/shared/CustomerReviews';
import { FAQ } from '@/components/shared/FAQ';
import { OtherServices } from '@/components/shared/OtherServices';
import { LeadForm } from '@/components/home/LeadForm';

export const metadata: Metadata = {
  title: 'Đăng Ký Truyền Hình FPT Play - Gói Max, VIP, Sport mới nhất',
  description:
    'Trải nghiệm truyền hình tương tác đỉnh cao cùng FPT Play. Độc quyền thể thao UEFA, V-League và kho phim bom tấn đặc sắc.',
  alternates: {
    canonical: 'https://fpt-telecom.vn/truyen-hinh-fpt-play',
  },
};

export default function TruyenHinhFPTPlayPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Truyền hình FPT Play',
      description: 'Dịch vụ truyền hình Internet số 1 Việt Nam với bản quyền giải trí đa dạng.',
      brand: {
        '@type': 'Brand',
        name: 'FPT Telecom',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '890',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Thanh Hùng' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody: 'Gói Sport thực sự đáng tiền. Xem Cúp C1 mượt mà không lo giật lag.',
        },
      ],
      offers: {
        '@type': 'AggregateOffer',
        url: 'https://fpt-telecom.vn/truyen-hinh-fpt-play',
        priceCurrency: 'VND',
        lowPrice: '73000',
        highPrice: '120000',
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
          name: 'Truyền Hình FPT Play',
          item: 'https://fpt-telecom.vn/truyen-hinh-fpt-play',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Tôi có thể xem FPT Play trên TV thường (không thông minh) được không?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hoàn toàn được. Khi đăng ký, FPT sẽ trang bị cho bạn thiết bị FPT Play Box (đầu thu thông minh) giúp biến mọi TV thường thành Smart TV.',
          },
        },
        {
          '@type': 'Question',
          name: 'Một tài khoản FPT Play xem được bao nhiêu thiết bị cùng lúc?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tuỳ theo gói cước bạn đăng ký. Gói SPORT xem trên 1 thiết bị, gói MAX xem trên tối đa 3 thiết bị, và gói VIP hỗ trợ xem đồng thời lên đến 5 thiết bị.',
          },
        },
      ],
    },
  ];

  const tvReviews = [
    {
      id: 1,
      name: 'Thanh Hùng',
      role: 'Fan Bóng Đá',
      content:
        'Gói Sport thực sự đáng tiền. Xem Cúp C1 mượt mà không lo giật lag như xem lậu, bình luận viên nhiệt huyết và hình ảnh 1080p sắc nét.',
      rating: 5,
      avatar: 'H',
    },
    {
      id: 2,
      name: 'Ngọc Mai',
      role: 'Nội Trợ',
      content:
        'Nhà có con nhỏ nên rất thích kho thiếu nhi của FPT Play. Nội dung được chọn lọc an toàn, có cả Netflix và Youtube tích hợp thẳng vào box, rất tiện lợi.',
      rating: 5,
      avatar: 'M',
    },
    {
      id: 3,
      name: 'Văn Lâm',
      role: 'Dân Ghiền Phim',
      content:
        'Đăng ký gói VIP được tặng kèm HBO Go là một món hời lớn. Xem phim bom tấn thả ga không có quảng cáo chen ngang, cuối tuần nào cũng như ở rạp.',
      rating: 5,
      avatar: 'L',
    },
  ];

  const tvFaq = [
    {
      question: 'Tôi có thể xem FPT Play trên TV thường (không thông minh) được không?',
      answer:
        'Hoàn toàn được. Khi đăng ký, FPT sẽ trang bị cho bạn thiết bị FPT Play Box (đầu thu thông minh) giúp biến mọi TV thường thành Smart TV, chỉ cần có cổng kết nối HDMI hoặc AV.',
    },
    {
      question: 'Một tài khoản FPT Play xem được bao nhiêu thiết bị cùng lúc?',
      answer:
        'Tuỳ theo gói cước bạn đăng ký. Gói SPORT xem trên 1 thiết bị, gói MAX xem trên tối đa 3 thiết bị, và gói VIP hỗ trợ xem đồng thời lên đến 5 thiết bị.',
    },
    {
      question: 'Tôi đang dùng mạng Viettel/VNPT thì có đăng ký FPT Play được không?',
      answer:
        'Được. FPT Play là ứng dụng độc lập, hoạt động mượt mà trên bất kỳ nền tảng mạng Internet nào của các nhà cung cấp khác.',
    },
    {
      question: 'Gói VIP khác gói MAX ở điểm nào?',
      answer:
        'Gói VIP bao gồm toàn bộ quyền lợi của gói MAX, nhưng được ưu tiên xem hoàn toàn không có quảng cáo, tặng kèm kho phim HBO Go và K+, đồng thời tăng số lượng thiết bị đăng nhập cùng lúc lên 5 thiết bị.',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TvHero />
      <TvPricing />
      <CustomerReviews
        title="Trải Nghiệm Của Khán Giả"
        description="Đánh giá từ những khách hàng đang sử dụng FPT Play mỗi ngày."
        reviews={tvReviews}
      />
      <FAQ
        title="Hỏi Đáp Nhanh FPT Play"
        description="Giải đáp các câu hỏi thường gặp về đầu thu và gói cước truyền hình."
        data={tvFaq}
      />
      <OtherServices />

      {/* Re-use LeadForm for conversions */}
      <div className="dark:bg-background border-border/50 mt-12 border-t bg-slate-50 pt-12 pb-24">
        <div className="relative z-10 container mx-auto mb-[-60px] px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Đăng Ký Ngay Hôm Nay</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Để lại số điện thoại, nhân viên FPT sẽ tư vấn gói cước truyền hình phù hợp và hỗ trợ
            trang bị đầu thu Tivi Box miễn phí tại nhà.
          </p>
        </div>
        <LeadForm />
      </div>
    </>
  );
}
