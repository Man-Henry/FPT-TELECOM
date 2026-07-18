import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật',
  description:
    'Chính sách bảo mật và bảo vệ dữ liệu cá nhân của khách hàng FPT Telecom theo Nghị định 13/2023/NĐ-CP.',
  alternates: {
    canonical: 'https://fpt-telecom.vn/chinh-sach-bao-mat',
  },
};

export default function ChinhSachBaoMatPage() {
  return (
    <div className="bg-background py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <h1 className="text-foreground mb-8 text-4xl font-extrabold tracking-tight">
          Chính Sách Bảo Mật
        </h1>
        <p className="text-muted-foreground mb-12 text-lg">Cập nhật lần cuối: Tháng 07/2026</p>

        <div className="prose prose-invert max-w-none space-y-10">
          {/* 1. Giới thiệu */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">1. Giới Thiệu</h2>
            <p className="text-muted-foreground leading-relaxed">
              {siteConfig.name} cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của quý khách hàng.
              Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ
              thông tin cá nhân của bạn khi sử dụng website và dịch vụ của chúng tôi, tuân thủ theo{' '}
              <strong>Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân</strong>.
            </p>
          </section>

          {/* 2. Thông tin thu thập */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">
              2. Thông Tin Chúng Tôi Thu Thập
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Khi bạn đăng ký tư vấn hoặc sử dụng dịch vụ, chúng tôi có thể thu thập các thông tin
              sau:
            </p>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 leading-relaxed">
              <li>
                <strong className="text-foreground">Họ và tên:</strong> Để xưng hô và liên hệ tư
                vấn.
              </li>
              <li>
                <strong className="text-foreground">Số điện thoại:</strong> Để liên hệ tư vấn và hỗ
                trợ kỹ thuật.
              </li>
              <li>
                <strong className="text-foreground">Địa chỉ lắp đặt:</strong> Để khảo sát hạ tầng
                cáp quang và triển khai dịch vụ.
              </li>
              <li>
                <strong className="text-foreground">Dịch vụ và gói cước quan tâm:</strong> Để tư vấn
                phù hợp.
              </li>
              <li>
                <strong className="text-foreground">Địa chỉ IP:</strong> Để bảo mật và chống spam.
              </li>
              <li>
                <strong className="text-foreground">Thông tin thiết bị (User-Agent):</strong> Để tối
                ưu trải nghiệm và bảo mật.
              </li>
            </ul>
          </section>

          {/* 3. Mục đích sử dụng */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">
              3. Mục Đích Sử Dụng Thông Tin
            </h2>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 leading-relaxed">
              <li>Liên hệ tư vấn và hỗ trợ đăng ký dịch vụ.</li>
              <li>Khảo sát hạ tầng cáp quang tại địa chỉ lắp đặt.</li>
              <li>Gửi thông tin khuyến mãi, ưu đãi (chỉ khi có sự đồng ý của bạn).</li>
              <li>Cải thiện chất lượng dịch vụ và trải nghiệm website.</li>
              <li>Phát hiện và ngăn chặn gian lận, spam.</li>
            </ul>
          </section>

          {/* 4. Bảo mật dữ liệu */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">4. Bảo Mật Dữ Liệu</h2>
            <p className="text-muted-foreground leading-relaxed">
              Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân
              của bạn, bao gồm:
            </p>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2 leading-relaxed">
              <li>Mã hóa dữ liệu truyền tải (SSL/TLS).</li>
              <li>Xác thực chống bot (Google reCAPTCHA v3) và giới hạn tần suất truy cập.</li>
              <li>Lưu trữ trên hệ thống cơ sở dữ liệu được mã hóa.</li>
              <li>Hạn chế quyền truy cập dữ liệu chỉ cho nhân viên có thẩm quyền.</li>
            </ul>
          </section>

          {/* 5. Quyền của bạn */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">5. Quyền Của Bạn</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Theo Nghị định 13/2023/NĐ-CP, bạn có các quyền sau đối với dữ liệu cá nhân:
            </p>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 leading-relaxed">
              <li>
                <strong className="text-foreground">Quyền được biết:</strong> Biết thông tin nào
                đang được thu thập và mục đích sử dụng.
              </li>
              <li>
                <strong className="text-foreground">Quyền truy cập:</strong> Yêu cầu xem dữ liệu cá
                nhân đã lưu trữ.
              </li>
              <li>
                <strong className="text-foreground">Quyền chỉnh sửa:</strong> Yêu cầu sửa đổi thông
                tin không chính xác.
              </li>
              <li>
                <strong className="text-foreground">Quyền xóa:</strong> Yêu cầu xóa dữ liệu cá nhân
                (trừ trường hợp pháp luật yêu cầu lưu trữ).
              </li>
              <li>
                <strong className="text-foreground">Quyền rút lại đồng ý:</strong> Bạn có thể rút
                lại sự đồng ý bất kỳ lúc nào.
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Để thực hiện các quyền trên, vui lòng liên hệ qua hotline{' '}
              <a href={`tel:${siteConfig.hotline}`} className="text-primary hover:underline">
                {siteConfig.hotline}
              </a>{' '}
              hoặc email{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          {/* 6. Chia sẻ thông tin */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">
              6. Chia Sẻ Thông Tin Với Bên Thứ Ba
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Chúng tôi <strong>không bán, trao đổi hoặc cho thuê</strong> dữ liệu cá nhân của bạn
              cho bên thứ ba. Thông tin chỉ được chia sẻ trong các trường hợp:
            </p>
            <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2 leading-relaxed">
              <li>
                Với FPT Telecom (đơn vị cung cấp dịch vụ chính thức) để triển khai lắp đặt và hỗ trợ
                kỹ thuật.
              </li>
              <li>Khi có yêu cầu từ cơ quan nhà nước có thẩm quyền.</li>
              <li>Với sự đồng ý rõ ràng của bạn.</li>
            </ul>
          </section>

          {/* 7. Cookie */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">
              7. Cookie và Công Nghệ Theo Dõi
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Website của chúng tôi có thể sử dụng cookie và các công nghệ tương tự (Google
              Analytics, Microsoft Clarity) để cải thiện trải nghiệm người dùng. Bạn có thể tắt
              cookie trong cài đặt trình duyệt, tuy nhiên một số chức năng có thể bị ảnh hưởng.
            </p>
          </section>

          {/* 8. Liên hệ */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl font-bold">8. Liên Hệ</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về chính sách bảo mật, vui lòng liên hệ:
            </p>
            <div className="mt-4 space-y-2 rounded-xl border border-white/[0.06] bg-[#0F1A2E] p-6">
              <p className="text-foreground font-semibold">{siteConfig.name}</p>
              <p className="text-muted-foreground text-sm">📍 Địa chỉ: {siteConfig.address}</p>
              <p className="text-muted-foreground text-sm">
                📞 Hotline:{' '}
                <a href={`tel:${siteConfig.hotline}`} className="text-primary hover:underline">
                  {siteConfig.hotline}
                </a>
              </p>
              <p className="text-muted-foreground text-sm">
                ✉️ Email:{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-muted-foreground text-sm">
                🕐 Giờ làm việc: {siteConfig.workingHours}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
