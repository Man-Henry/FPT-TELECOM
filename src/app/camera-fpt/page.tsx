import { Metadata } from 'next';
import { CameraHero } from '@/components/camera/CameraHero';
import { CameraProducts } from '@/components/camera/CameraProducts';
import { CustomerReviews } from '@/components/shared/CustomerReviews';
import { FAQ } from '@/components/shared/FAQ';
import { OtherServices } from '@/components/shared/OtherServices';
import { LeadForm } from '@/components/home/LeadForm';

export const metadata: Metadata = {
  title: 'Lắp Camera FPT IQ - Cảnh báo AI thông minh, Lưu trữ Cloud',
  description: 'Camera FPT ứng dụng trí tuệ nhân tạo AI. Giải pháp an ninh thông minh cho gia đình và doanh nghiệp. Dữ liệu bảo mật tuyệt đối trên Cloud server Việt Nam.',
  alternates: {
    canonical: 'https://fpt-telecom.vn/camera-fpt',
  }
};

export default function CameraFPTPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Camera FPT IQ",
      "description": "Camera an ninh thông minh với công nghệ AI và lưu trữ Cloud.",
      "brand": {
        "@type": "Brand",
        "name": "FPT Telecom"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "540"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Anh Long" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "reviewBody": "Dùng Cloud yên tâm tuyệt đối. Tốc độ xem lại trên điện thoại cực nhanh."
        }
      ],
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://fpt-telecom.vn/camera-fpt",
        "priceCurrency": "VND",
        "lowPrice": "800000",
        "highPrice": "1300000",
        "offerCount": "2"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://fpt-telecom.vn"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Camera FPT",
          "item": "https://fpt-telecom.vn/camera-fpt"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Tại sao nên chọn lưu trữ Cloud thay vì thẻ nhớ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lưu trữ Cloud giúp dữ liệu an toàn tuyệt đối 100%. Nếu kẻ gian đập phá Camera, bạn vẫn có thể xem lại hình ảnh."
          }
        },
        {
          "@type": "Question",
          "name": "Nhà tôi đang dùng mạng Viettel, VNPT thì có lắp được Camera FPT không?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hoàn toàn được. Camera FPT hoạt động ổn định trên mọi nền tảng Internet của các nhà mạng khác nhau."
          }
        }
      ]
    }
  ];

  const cameraReviews = [
    {
      id: 1,
      name: 'Anh Long',
      role: 'Chủ cửa hàng tạp hoá',
      content: 'Trước đây mình dùng thẻ nhớ hay bị lỗi mất dữ liệu. Từ ngày chuyển sang FPT Camera dùng Cloud, yên tâm tuyệt đối. Tốc độ xem lại trên điện thoại cực nhanh.',
      rating: 5,
      avatar: 'L'
    },
    {
      id: 2,
      name: 'Chị Hà',
      role: 'Dân văn phòng',
      content: 'Tính năng khoanh vùng cảnh báo AI rất xịn. Ở công ty nhưng vẫn theo dõi được con nhỏ ở nhà, camera phân biệt được chó mèo nên không bị báo động giả.',
      rating: 5,
      avatar: 'H'
    },
    {
      id: 3,
      name: 'Bác Tâm',
      role: 'Cán bộ hưu trí',
      content: 'Trời mưa bão mà camera ngoài trời vẫn nét căng, đèn hồng ngoại chiếu xa sáng rực ban đêm. Nhân viên kỹ thuật xuống lắp đặt nhanh nhẹn, chu đáo.',
      rating: 5,
      avatar: 'T'
    }
  ];

  const cameraFaq = [
    {
      question: 'Tại sao nên chọn lưu trữ Cloud thay vì thẻ nhớ?',
      answer: 'Lưu trữ Cloud (đám mây) giúp dữ liệu của bạn an toàn tuyệt đối 100%. Nếu không may có kẻ gian đột nhập lấy cắp hay đập phá Camera, bạn vẫn có thể xem lại toàn bộ hình ảnh trước đó trên điện thoại. Với thẻ nhớ, dữ liệu sẽ mất hoàn toàn.'
    },
    {
      question: 'Nhà tôi đang dùng mạng Viettel, VNPT thì có lắp được Camera FPT không?',
      answer: 'Hoàn toàn được. Camera FPT hoạt động ổn định trên mọi nền tảng Internet của các nhà mạng khác nhau.'
    },
    {
      question: 'Bảo hành và bảo trì trong bao lâu?',
      answer: 'Thiết bị Camera FPT được bảo hành chính hãng 24 tháng. Dịch vụ bảo trì và hỗ trợ kỹ thuật được miễn phí trọn đời trong suốt quá trình bạn sử dụng dịch vụ lưu trữ Cloud.'
    },
    {
      question: 'Khi mất điện Camera có hoạt động không?',
      answer: 'Cũng giống như các loại camera thông thường, Camera FPT cần có nguồn điện để hoạt động. Nếu bạn muốn camera duy trì khi mất điện, có thể trang bị thêm bộ lưu điện (UPS) hoặc sử dụng nguồn dự phòng.'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CameraHero />
      <CameraProducts />
      <CustomerReviews 
        title="Đánh Giá Từ Người Dùng"
        description="Bảo vệ gia đình và tài sản an toàn với giải pháp giám sát thông minh."
        reviews={cameraReviews} 
      />
      <FAQ 
        title="Giải Đáp Thắc Mắc Camera FPT"
        description="Những thông tin cần biết trước khi lắp đặt hệ thống an ninh."
        data={cameraFaq} 
      />
      <OtherServices />
      
      {/* Re-use LeadForm for conversions */}
      <div className="bg-slate-50 dark:bg-background pt-12 pb-24 border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 text-center mb-[-60px] relative z-10">
          <h2 className="text-3xl font-bold mb-4">Đăng Ký Tư Vấn & Khảo Sát Miễn Phí</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nhân viên kỹ thuật FPT sẽ xuống tận nơi khảo sát góc lắp đặt, độ sáng, tư vấn vị trí và số lượng camera phù hợp hoàn toàn miễn phí.
          </p>
        </div>
        <LeadForm />
      </div>
    </>
  );
}
